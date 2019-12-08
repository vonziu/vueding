<template>
  <form class="col-12 p-12" @submit.prevent="onCreate">
    <v-text-field
      dark
      label="Name"
      placeholder="Name"
      v-model="$v.createEventForm.name.$model"
      :error-messages="collectErrors($v.createEventForm.name, 'name')"
      solo/>
    <v-text-field
      dark
      label="Location"
      placeholder="Location"
      v-model="$v.createEventForm.location.$model"
      :error-messages="collectErrors($v.createEventForm.location, 'location')"
      solo/>
    <AppInputDate
      :error-messages="collectErrors($v.createEventForm.date, 'data rozpoczęcia')"
      :min="minDate"
      :initialDate="$v.createEventForm.date.$model"
      label="Select date"
      v-model="$v.createEventForm.date.$model">
    </AppInputDate>
    <AppTimePicker
      :min="minTime"
      :error-messages="collectErrors($v.createEventForm.time, 'czas rozpoczęcia')"
      :initialTime="$v.createEventForm.time.$model"
      label="Start time"
      v-model="$v.createEventForm.time.$model">
    </AppTimePicker>
    <v-textarea
      label="Description"
      no-resize
      placeholder="Description"
      rows="10"
      dark
      v-model="$v.createEventForm.description.$model"
      :error-messages="collectErrors($v.createEventForm.description, 'description')"
      solo/>
    <v-textarea
      @input="checkValidity"
      no-resize
      label="Bulk insert email accounts"
      placeholder="Bulk insert email accounts"
      rows="10"
      v-model="mailList"
      persistent-hint
      color="white"
      :error-messages="isMailListValid(mailList, this.$v.$dirty, 'email list')"
      hint="You can pass as much mail addresses as you want as long as they separated by comma.
      If there is some duplicates, we will remove it for you"
      dark
      solo/>
    <v-btn
      type="submit"
      dark
      color="#42b983"
      class="mr-3"
      fab>
      <v-icon>fas fa-check</v-icon>
    </v-btn>
    <v-btn
      @click="$emit('close')"
      dark
      color="#c14940"
      fab>
      <v-icon>fas fa-times</v-icon>
    </v-btn>
  </form>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import {validationMixin} from 'vuelidate';
  import {email} from 'vuelidate/lib/validators';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import {createEventValidation} from '@/components/events/create/create.validation';
  import {CreateFormApi, Mail} from '@/components/events/model/model';
  import EventFactory from '@/components/events/event.factory';
  import AppInputDate from '@/components/UI/appDatePicker.vue';
  import AppTimePicker from '@/components/UI/appTimePicker.vue';

  @Component({
    name: 'CreateEventForm',
    mixins: [validationMixin, createEventValidation],
    components: {
      AppInputDate,
      AppTimePicker,
    },
  })
  export default class CreateEventForm extends mixins(ValidationConverterMixin) {
    createEventForm: CreateFormApi = EventFactory.initCreateForm();
    mailList: string | null = null;

    onCreate(): void {
      this.$v.$touch();
      const {isValid, list} = this.checkValidity(this.mailList);
      if (!this.$v.$invalid && isValid) {
        this.createEventForm.emailList = list.map(item => EventFactory.toMailObject(item));
        this.$emit('create', this.createEventForm);
      }
    }

    get minDate(): string {
      return new Date().toISOString();
    }

    get minTime(): string {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}`;
    }

    checkValidity(mailString: string | null) {
      if (!mailString) {
        return {
          isValid: false,
          list: [],
        };
      }
      const mailList = mailString.split(',');
      const isValid = this.checkMail(mailList);
      return {
        isValid,
        list: isValid ? this.removeDupes(this.trim(mailList)) : [],
      };
    }

    trim(list: string[]): string[] {
      return list.map(item => item.replace(' ', ''));
    }

    removeDupes(list: string[]): string[] {
      return [...new Set(list)];
    }
  }
</script>
