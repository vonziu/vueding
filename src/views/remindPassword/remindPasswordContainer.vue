<template>
  <section class="col-xl-6 col-lg-10 col-md-7 text-center" >
    <v-img src="@/assets/l.png"/>
    <form v-if="!completed" @submit.prevent="onRemind">
      <h2 class="mt-3 mb-3">Type your mail to receive reset password mail</h2>
      <v-text-field
        label="Email"
        :error-messages="collectErrors($v.mail, 'mail')"
        v-model="$v.mail.$model"
        solo/>
      <section class="d-flex justify-content-center w-100">
        <v-btn type="submit" color="primary" large>Send remind email</v-btn>
      </section>
      <section class="d-flex justify-content-center w-100 mt-3">
        <router-link :to="'/login'">Want to sign in ?</router-link>
      </section>
    </form>
    <OnComplete v-else to="/login">
      <template #info>
        <h2 class="mb-3">
          Email with informations about password reset was send to your inbox
        </h2>
      </template>
    </OnComplete>
  </section>
</template>

<script lang="ts">

  import {Component} from 'vue-property-decorator';
  import {validationMixin} from 'vuelidate';
  import {mixins} from 'vue-class-component';
  import {remindPasswordValidation} from '@/components/remindPassword/remindPassword.validation';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import AuthRepository from '@/common/auth/AuthRepository';
  import OnComplete from '@/common/component/OnSuccess.vue';
  import NotificationService from '@/common/service/NotificationService';

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
          await AuthRepository.remindPassword(this.mail as string);
          this.completed = true;
        } catch (e) {
          NotificationService.error(e);
        }
      }
    }
  }
</script>
