import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthPanel from '@/views/authPanel.vue';
import LoginContainer from '@/views/login/loginContainer.vue';

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
        component: LoginContainer,
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/register/registerContainer.vue'),
      },
      {
        path: '/activate-account/:token',
        name: 'activateAccount',
        component: () => import(/* webpackChunkName: "activateAccount" */ '@/views/activateAccount/activateAccountContainer.vue'),
      },
      {
        path: '/remind-password',
        name: 'remindPassword',
        component: () => import(/* webpackChunkName: "remindPassword" */ '@/views/remindPassword/remindPasswordContainer.vue'),
      },
      {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/resetPassword/resetPasswordContainer.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next({
      name: 'login',
    });
  }
  return next();
});

export default router;
