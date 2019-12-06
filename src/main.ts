import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/index.scss';
import '@/config/vuelidate';
import '@/config/firebase';
import AuthRepository from '@/common/auth/AuthRepository';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/config/notifications';

Vue.config.productionTip = false;

AuthRepository.isAuthorized(router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
