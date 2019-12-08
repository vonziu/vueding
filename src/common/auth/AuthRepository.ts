import * as firebase from 'firebase/app';
import 'firebase/auth';
import {VueRouter} from 'vue-router/types/router.d';
import {RegisterApi} from '@/components/register/register.model';
import {User, UserCredential} from '@/common/model/firebase.types';
import {LoginApi} from '@/components/login/login.types';
import store from '@/store';

async function register(api: RegisterApi): Promise<User | null> {
  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(api.mail as string, api.password as string);
  if (result.user) {
    await result.user.updateProfile({displayName: api.name as string});
  }
  return result.user;
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

function resetPassword(newPassword: string, code: string): Promise<void> {
  return firebase
    .auth()
    .confirmPasswordReset(code, newPassword);
}

async function signOut(): Promise<void> {
  return firebase
    .auth()
    .signOut();
}

function isAuthorized(router: VueRouter): void {
  try {
    firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!localStorage.getItem('isLoggedIn')) return;
        if (user) {
          localStorage.setItem('isLoggedIn', true.toString());
          store.commit('setUser', user);
        }
        if (!user && localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('isLoggedIn') as string)) {
          localStorage.setItem('isLoggedIn', false.toString());
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
  signOut,
  signIn,
};
