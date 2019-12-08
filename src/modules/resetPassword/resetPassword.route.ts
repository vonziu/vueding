export const resetPasswordRoute = {
  path: '/reset-password',
  name: 'resetPassword',
  component: () => import(/* webpackChunkName: "resetPassword" */ '@/modules/resetPassword/resetPassword.container.vue'),
  meta: {
    public: true,
    onlyWhenLoggedOut: true,
  },
};
