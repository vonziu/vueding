import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthPanel from '@/views/authPanel.vue';
import LoggedView from '@/views/loggedView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthPanel,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "register" */ '@/views/login/loginContainer.vue'),
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/register/registerContainer.vue'),
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: '/remind-password',
        name: 'remindPassword',
        component: () => import(/* webpackChunkName: "remindPassword" */ '@/views/remindPassword/remindPasswordContainer.vue'),
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/resetPassword/resetPasswordContainer.vue'),
        meta: {
          public: true,
          onlyWhenLoggedOut: true,
        },
      },
    ],
  },
  {
    path: '/panel',
    name: 'panel',
    component: LoggedView,
    meta: {
      public: false,
      onlyWhenLoggedOut: false,
    },
    children: [{
      path: 'events',
      name: 'events',
      component: () => import(/* webpackChunkName: "events" */ '@/views/events/eventsContainer.vue'),
      meta: {
        public: false,
        onlyWhenLoggedOut: false,
      },
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = localStorage.getItem('isLoggedIn') ? JSON.parse(localStorage.getItem('isLoggedIn') as string) : false;
  if (to.fullPath === '/') {
    if (loggedIn) {
      return next({name: 'events'});
    }
    if (!loggedIn) {
      return next({name: 'login'});
    }
  }
  if (!isPublic && !loggedIn) {
    return next({name: 'login'});
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next({name: 'events'});
  }
  return next();
});


export default router;
