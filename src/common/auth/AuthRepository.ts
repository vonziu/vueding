import * as firebase from 'firebase/app';
import 'firebase/auth';
import {VueRouter} from 'vue-router/types/router.d';
import {RegisterApi} from '@/components/register/register.model';
import {UserCredential} from '@/common/model/firebase.types';
import {LoginApi} from '@/components/login/login.types';

function register(api: RegisterApi): Promise<UserCredential> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(api.mail as string, api.password as string);
}

function signIn(api: LoginApi): Promise<UserCredential> {
  return firebase
    .auth()
    .signInWithEmailAndPassword(api.mail as string, api.password as string);
}

function remindPassword(mail: string): Promise<void> {
  return firebase
    .auth()
    .sendPasswordResetEmail(mail);
}

async function resetPassword(newPassword: string, code: string): Promise<void> {
  return firebase
    .auth()
    .confirmPasswordReset(code, newPassword);
}

function isAuthorized(router: VueRouter): void {
  try {
    firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!localStorage.getItem('isLoggedIn')) return;
        if (user) {
          localStorage.setItem('isLoggedIn', true.toString());
        }
        if (!user && localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn') as string)) {
          localStorage.setItem('isLoggedIn', false.toString());
          await router.push({name: 'login'});
        }
      });
  } catch (e) {
    router.push({name: 'login'});
    localStorage.setItem('isLoggedIn', false.toString());
  }
}

export default {
  remindPassword,
  resetPassword,
  isAuthorized,
  register,
  signIn,
};
