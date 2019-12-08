import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '@/router/routes';
import {storageRepository} from '@/common/repository/storage.repository';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = storageRepository.getAuthState();
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
