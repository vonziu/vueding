export const remindPasswordRoute = {
  path: '/remind-password',
  name: 'remindPassword',
  component: () => import(/* webpackChunkName: "remindPassword" */ '@/modules/remindPassword/remindPassword.container.vue'),
  meta: {
    public: true,
    onlyWhenLoggedOut: true,
  },
};
