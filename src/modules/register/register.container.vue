<template>
  <section class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img
      :min-height="$appConstants.APP_LOGO_MIN_HEIGHT"
      :max-height="$appConstants.APP_LOGO_MAX_HEIGHT"
      src="@/assets/logo.png"
      contain/>
    <form
      v-if="!completed"
      @submit.prevent="onRegister">
      <h2 class="mb-3 mt-3">
        After register we will automatically sign you in
      </h2>
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
        <v-btn
          type="submit"
          :color="$appConstants.COLOR_PRIMARY"
          large>
          Register account
        </v-btn>
      </section>
      <section class="d-flex justify-content-center w-100 mt-3">
        <router-link :to="'/login'">
          Already registered ? Sign in
        </router-link>
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
  import ValidationConverterMixin from '@/common/mixins/validationConverter.mixin';
  import {registerValidation} from '@/modules/register/register.validation';
  import {RegisterApi} from '@/modules/register/register.model';
  import {authRepository} from '@/common/repository/auth.repository';
  import OnComplete from '@/common/component/appOnSuccess.vue';
  import {notificationRepository} from '@/common/repository/notification.repository';
  import {storageRepository} from '@/common/repository/storage.repository';

  @Component({
    name: 'registerContainer',
    components: {
      OnComplete,
    },
    mixins: [validationMixin, registerValidation],
  })
  export default class RegisterContainer extends mixins(ValidationConverterMixin) {
    registerApi: RegisterApi = {
      mail: null,
      name: null,
      password: null,
      repeatPassword: null,
    };
    showPassword: boolean = false;
    showRepeatPassword: boolean = false;
    completed: boolean = false;

    async onRegister(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.$store.commit('setUser', await authRepository.register(this.registerApi));
          storageRepository.setAuthState(true);
          await this.$router.push({name: 'events'});
        } catch (e) {
          notificationRepository.error(e);
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
