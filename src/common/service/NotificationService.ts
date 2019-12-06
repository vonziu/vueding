import Vue from 'vue';

class NotificationService {
  static success(message: string): void {
    Vue.prototype.$awn.success(message, {labels: {success: 'Success'}});
  }

  static info(message: string): void {
    Vue.prototype.$awn.info(message, {labels: {info: 'Info'}});
  }

  static error(message?: any): void {
    Vue.prototype.$awn.alert(message, {labels: {alert: 'Error'}});
  }

  static warn(message: string): void {
    Vue.prototype.$awn.warning(message, {labels: {warning: 'Warning'}});
  }
}

export default NotificationService;
