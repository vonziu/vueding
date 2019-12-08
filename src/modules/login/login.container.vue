<template>
  <form
    @submit.prevent="onLogin"
    class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img
      :min-height="$appConstants.APP_LOGO_MIN_HEIGHT"
      :max-height="$appConstants.APP_LOGO_MAX_HEIGHT"
      src="@/assets/logo.png"/>
    <h2 class="mt-3 mb-3">
      Sign in to Vueding app
    </h2>
    <v-text-field
      label="Login"
      v-model="$v.loginApi.mail.$model"
      :error-messages="collectErrors($v.loginApi.mail, 'mail')"
      solo/>
    <v-text-field
      label="Password"
      v-model="$v.loginApi.password.$model"
      :type="showPassword ? 'text' : 'password'"
      :error-messages="collectErrors($v.loginApi.password, 'password')"
      :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
      @click:append="showPassword = !showPassword"
      solo/>
    <div class="d-flex justify-content-end w-100 mb-3">
      <router-link :to="'/remind-password'">
        Forgotten password ?
      </router-link>
    </div>
    <section class="d-flex justify-content-between w-100">
      <v-btn
        to="/register"
        large>
        Sign up
      </v-btn>
      <v-btn
        type="submit"
        :color="$appConstants.COLOR_PRIMARY"
        large>
        Sign in
      </v-btn>
    </section>
  </form>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {validationMixin} from 'vuelidate';
  import {mixins} from 'vue-class-component';
  import {LoginApi} from '@/modules/login/login.types';
  import {loginValidation} from '@/modules/login/login.validation';
  import ValidationConverterMixin from '@/common/mixins/validationConverter.mixin';
  import {authRepository} from '@/common/repository/auth.repository';
  import {notificationRepository} from '@/common/repository/notification.repository';
  import {storageRepository} from '@/common/repository/storage.repository';

  @Component({
    name: 'LoginContainer',
    mixins: [validationMixin, loginValidation],
  })
  export default class LoginContainer extends mixins(ValidationConverterMixin) {
    loginApi: LoginApi = {mail: null, password: null};
    showPassword: boolean = false;

    async onLogin(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          const {user} = await authRepository.signIn(this.loginApi);
          storageRepository.setAuthState(true);
          this.$store.commit('setUser', user);
          await this.$router.push({name: 'events'});
        } catch (e) {
          notificationRepository.error(e);
        }
      }
    }
  }
</script>
