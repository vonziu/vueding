export const confirmInvitationRoute = {
  path: '/confirm/:eventId/:mail',
  name: 'confirmInvitation',
  component: () => import(/* webpackChunkName: "confirmInvitation" */ '@/modules/confirmInvitation/confirmInvitation.vue'),
  meta: {
    public: true,
    onlyWhenLoggedOut: false,
  },
};
