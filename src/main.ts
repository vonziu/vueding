import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/index.scss';
import '@/plugins/vuelidate';
import '@/plugins/firebase';
import {authRepository} from '@/common/repository/auth.repository';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/plugins/notifications';
import constantsMixin from '@/common/mixins/constant.mixin';

Vue.mixin(constantsMixin);
Vue.config.productionTip = false;
authRepository.isAuthorized(router);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
