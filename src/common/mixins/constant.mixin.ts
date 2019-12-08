import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class ValidationConverterMixin extends Vue {
  get $appConstants() {
    return {
      COLOR_PRIMARY: 'primary',
      COLOR_WHITE: 'white',
      COLOR_GREEN: '#42b983',
      COLOR_DARK: '#2e2f33',
      COLOR_DANGER: '#c14940',
      APP_LOGO_MAX_HEIGHT: '350px',
      APP_LOGO_MIN_HEIGHT: '250px',
    };
  }
}
