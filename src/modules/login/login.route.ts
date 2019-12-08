export const loginRoute = {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "register" */ '@/modules/login/login.container.vue'),
  meta: {
    public: true,
    onlyWhenLoggedOut: true,
  },
};
