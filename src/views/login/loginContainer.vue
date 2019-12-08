<template>
  <form @submit.prevent="onLogin" class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img min-height="250px" max-height="350px" src="@/assets/l.png"/>
    <h2 class="mt-3 mb-3">Sign in to Vueding app</h2>
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
      <router-link :to="'/remind-password'">Forgotten password ?</router-link>
    </div>
    <section class="d-flex justify-content-between w-100">
      <v-btn to="/register" large>Sign up</v-btn>
      <v-btn type="submit" color="primary" large>Sign in</v-btn>
    </section>
  </form>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {validationMixin} from 'vuelidate';
  import {mixins} from 'vue-class-component';
  import {LoginApi} from '@/components/login/login.types';
  import {loginValidation} from '@/components/login/login.validation';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import AuthRepository from '@/common/auth/AuthRepository';
  import NotificationService from '@/common/service/NotificationService';

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
          const {user} = await AuthRepository.signIn(this.loginApi);
          localStorage.setItem('isLoggedIn', true.toString());
          this.$store.commit('setUser', user);
          await this.$router.push({name: 'events'});
        } catch (e) {
          NotificationService.error(e);
        }
      }
    }
  }
</script>

<style scoped lang="scss">


</style>
