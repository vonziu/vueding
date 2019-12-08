import Vue from 'vue';

function success(message: string): void {
  Vue.prototype.$awn.success(message, {labels: {success: 'Success'}});
}

function info(message: string): void {
  Vue.prototype.$awn.info(message, {labels: {info: 'Info'}});
}

function error(message?: any): void {
  Vue.prototype.$awn.alert(message, {labels: {alert: 'Error'}});
}

function warn(message: string): void {
  Vue.prototype.$awn.warning(message, {labels: {warning: 'Warning'}});
}

export const notificationRepository = {
  warn,
  error,
  info,
  success,
};
