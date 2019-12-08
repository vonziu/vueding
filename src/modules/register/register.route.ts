export const registerRoute = {
  path: '/register',
  name: 'register',
  component: () => import(/* webpackChunkName: "register" */ '@/modules/register/register.container.vue'),
  meta: {
    public: true,
    onlyWhenLoggedOut: true,
  },
};
