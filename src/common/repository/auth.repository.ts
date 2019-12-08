import * as firebase from 'firebase/app';
import 'firebase/auth';
import {VueRouter} from 'vue-router/types/router.d';
import {RegisterApi} from '@/modules/register/register.model';
import {User, UserCredential} from '@/common/types';
import {LoginApi} from '@/modules/login/login.types';
import store from '@/store';
import {storageRepository} from '@/common/repository/storage.repository';

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
        if (!storageRepository.getAuthState()) return;
        if (user) {
          storageRepository.setAuthState(true);
          store.commit('setUser', user);
        }
        if (!user && storageRepository.getAuthState()) {
          storageRepository.setAuthState(false);
        }
      });
  } catch (e) {
    router.push({name: 'login'});
    storageRepository.setAuthState(false);
  }
}

export const authRepository = {
  remindPassword,
  resetPassword,
  isAuthorized,
  register,
  signOut,
  signIn,
};
