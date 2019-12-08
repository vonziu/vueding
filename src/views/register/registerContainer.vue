<template>
  <section class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img max-height="350px" contain src="@/assets/l.png"/>
    <form v-if="!completed" @submit.prevent="onRegister">
      <h2 class="mb-3 mt-3">After register we will automatically sign you in</h2>
      <v-text-field
        label="First name"
        :error-messages="collectErrors($v.registerApi.name, 'first name')"
        v-model="$v.registerApi.name.$model"
        solo/>
      <v-text-field
        label="Email"
        :error-messages="collectErrors($v.registerApi.mail, 'Email')"
        v-model="$v.registerApi.mail.$model"
        solo/>
      <v-text-field
        label="Password"
        :error-messages="collectErrors($v.registerApi.password, 'Password')"
        v-model="$v.registerApi.password.$model"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="showPassword = !showPassword"
        solo/>
      <v-text-field
        label="Repeat password"
        :error-messages="collectErrors($v.registerApi.repeatPassword, 'Repeat password')"
        v-model="$v.registerApi.repeatPassword.$model"
        :type="showRepeatPassword ? 'text' : 'password'"
        :append-icon="showRepeatPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="showRepeatPassword = !showRepeatPassword"
        solo/>
      <section class="d-flex justify-content-center w-100">
        <v-btn type="submit" color="primary" large>Register account</v-btn>
      </section>
      <section class="d-flex justify-content-center w-100 mt-3">
        <router-link :to="'/login'">Already registered ? Sign in</router-link>
      </section>
    </form>
    <OnComplete v-else to="/login">
      <template #info>
        <h2 class="mb-3">
          We restored your password. Visit login page to sign in
        </h2>
      </template>
    </OnComplete>
  </section>
</template>

<script lang="ts">
  import {validationMixin} from 'vuelidate';
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import {registerValidation} from '@/components/register/register.validation';
  import {RegisterApi} from '@/components/register/register.model';
  import AuthRepository from '@/common/auth/AuthRepository';
  import AppSnackbar from '@/components/UI/appSnackbar.vue';
  import OnComplete from '@/common/component/OnSuccess.vue';
  import NotificationService from '@/common/service/NotificationService';

  @Component({
    name: 'registerContainer',
    components: {
      AppSnackbar,
      OnComplete,
    },
    mixins: [validationMixin, registerValidation],
  })
  export default class RegisterContainer extends mixins(ValidationConverterMixin) {
    registerApi: RegisterApi = {
      mail: null, name: null, password: null, repeatPassword: null,
    };
    showPassword: boolean = false;
    showRepeatPassword: boolean = false;
    completed: boolean = false;

    async onRegister(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.$store.commit('setUser', await AuthRepository.register(this.registerApi));
          localStorage.setItem('isLoggedIn', String(true));
          await this.$router.push({name: 'events'});
        } catch (e) {
          NotificationService.error(e);
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  form {
    text-align: center;
  }
</style>
