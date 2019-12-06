import Vue from 'vue';
import 'vue-awesome-notifications/dist/styles/style.css';
// @ts-ignore
import VueAWN from 'vue-awesome-notifications';

const options = {
  position: 'top-right',
  icons: {
    success: ' far fa-check-circle',
    alert: ' fas fa-exclamation-circle',
  },
  durations: {
    global: 4000,
  },
};
Vue.use(VueAWN, options);
