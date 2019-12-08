<template>
  <section class="col-xl-6 col-lg-10 col-md-7 text-center">
    <v-img
      :min-height="$appConstants.APP_LOGO_MIN_HEIGHT"
      :max-height="$appConstants.APP_LOGO_MAX_HEIGHT"
      src="@/assets/logo.png"/>
    <form
      v-if="!completed"
      @submit.prevent="onRemind">
      <h2 class="mt-3 mb-3">
        Type your mail to receive reset password mail
      </h2>
      <v-text-field
        label="Email"
        :error-messages="collectErrors($v.mail, 'mail')"
        v-model="$v.mail.$model"
        solo/>
      <section class="d-flex justify-content-center w-100">
        <v-btn
          type="submit"
          :color="$appConstants.COLOR_PRIMARY"
          large>
          Send remind email
        </v-btn>
      </section>
      <section class="d-flex justify-content-center w-100 mt-3">
        <router-link :to="'/login'">
          Want to sign in ?
        </router-link>
      </section>
    </form>
    <OnComplete v-else to="/login">
      <template #info>
        <h2 class="mb-3">
          Email with informations about password reset was sent to your inbox
        </h2>
      </template>
    </OnComplete>
  </section>
</template>

<script lang="ts">

  import {Component} from 'vue-property-decorator';
  import {validationMixin} from 'vuelidate';
  import {mixins} from 'vue-class-component';
  import {remindPasswordValidation} from '@/modules/remindPassword/remindPassword.validation';
  import ValidationConverterMixin from '@/common/mixins/validationConverter.mixin';
  import {authRepository} from '@/common/repository/auth.repository';
  import OnComplete from '@/common/component/appOnSuccess.vue';
  import {notificationRepository} from '@/common/repository/notification.repository';

  @Component({
    name: 'remindPasswordContainer',
    components: {
      OnComplete,
    },
    mixins: [validationMixin, remindPasswordValidation],
  })
  export default class RemindPasswordContainer extends mixins(ValidationConverterMixin) {
    mail: string | null = null;
    completed: boolean = false;

    async onRemind(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await authRepository.remindPassword(this.mail as string);
          this.completed = true;
        } catch (e) {
          notificationRepository.error(e);
        }
      }
    }
  }
</script>
