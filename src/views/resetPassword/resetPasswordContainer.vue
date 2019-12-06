<template>
  <section class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img src="@/assets/l.png"/>
    <form @submit.prevent="onReset" v-if="!completed">
      <h2 class="mt-3 mb-3">Reset your password</h2>
      <v-text-field
        label="Password"
        :error-messages="collectErrors($v.resetPasswordApi.password, 'Password')"
        v-model="$v.resetPasswordApi.password.$model"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="showPassword = !showPassword"
        solo/>
      <v-text-field
        label="Repeat password"
        :error-messages="collectErrors($v.resetPasswordApi.repeatPassword, 'Repeat password')"
        v-model="$v.resetPasswordApi.repeatPassword.$model"
        :type="showRepeatPassword ? 'text' : 'password'"
        :append-icon="showRepeatPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="showRepeatPassword = !showRepeatPassword"
        solo/>
      <section class="d-flex justify-content-center w-100">
        <v-btn type="submit" color="primary" large>Reset password</v-btn>
      </section>
      <section class="d-flex justify-content-center w-100 mt-3">
        <router-link :to="'/login'">Want to sign in ?</router-link>
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

  import {Component} from 'vue-property-decorator';
  import {validationMixin} from 'vuelidate';
  import {mixins} from 'vue-class-component';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import AuthRepository from '@/common/auth/AuthRepository';
  import {resetPasswordValidation} from '@/components/resetPassword/resetPassword.validation';
  import {ResetPasswordApi} from '@/components/resetPassword/resetPassword.model';
  import NotificationService from '@/common/service/NotificationService';
  import OnComplete from '@/common/component/OnSuccess.vue';

  @Component({
    name: 'resetPasswordContainer',
    components: {
      OnComplete,
    },
    mixins: [validationMixin, resetPasswordValidation],
  })
  export default class ResetPasswordContainer extends mixins(ValidationConverterMixin) {
    resetPasswordApi: ResetPasswordApi = {password: null, repeatPassword: null};
    showPassword: boolean = false;
    completed: boolean = false;
    showRepeatPassword: boolean = false;

    async onReset(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid && this.$route.query && this.$route.query.oobCode) {
        try {
          await AuthRepository
            .resetPassword(
              this.resetPasswordApi.password as string,
              this.$route.query.oobCode as string,
            );
          this.completed = true;
        } catch (e) {
          NotificationService.error(e);
        }
      }
    }
  }
</script>
