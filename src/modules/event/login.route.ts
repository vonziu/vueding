export const eventRoute = {
  path: 'events',
  name: 'events',
  component: () => import(/* webpackChunkName: "events" */ '@/modules/event/events.container.vue'),
  meta: {
    public: false,
    onlyWhenLoggedOut: false,
  },
};
