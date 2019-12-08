import AuthPanel from '@/layout/auth.layout.vue';
import {loginRoute} from '@/modules/login/login.route';
import {registerRoute} from '@/modules/register/register.route';
import {remindPasswordRoute} from '@/modules/remindPassword/remindPassword.route';
import {resetPasswordRoute} from '@/modules/resetPassword/resetPassword.route';
import LoggedView from '@/layout/panel/panel.layout.vue';
import {eventRoute} from '@/modules/event/login.route';
import {confirmInvitationRoute} from '@/modules/confirmInvitation/confirmInvitation.route';

export const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthPanel,
    children: [
      loginRoute,
      registerRoute,
      remindPasswordRoute,
      resetPasswordRoute,
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
    children: [
      eventRoute,
    ],
  },
  confirmInvitationRoute,
];
