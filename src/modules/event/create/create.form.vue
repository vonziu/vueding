<template>
  <form
    class="col-12 p-12"
    @submit.prevent="onCreate">
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
      :error-messages="collectErrors($v.createEventForm.date, 'start date')"
      :min="minDate"
      :initialDate="$v.createEventForm.date.$model"
      label="Select date"
      v-model="$v.createEventForm.date.$model">
    </AppInputDate>
    <AppTimePicker
      :min="minTime"
      :error-messages="collectErrors($v.createEventForm.time, 'start time')"
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
      :color="$appConstants.COLOR_WHITE"
      :error-messages="isMailListValid(mailList, this.$v.$dirty, 'email list')"
      hint="For presentational puproses you can add maximum 5 mail addresses separated by comma.
      If there is some duplicates, we will remove it for you"
      dark
      solo/>
    <v-btn
      type="submit"
      dark
      :color="$appConstants.COLOR_GREEN"
      class="mr-3"
      fab>
      <v-icon>
        fas fa-check
      </v-icon>
    </v-btn>
    <v-btn
      @click="$emit('close')"
      dark
      :color="$appConstants.COLOR_DANGER"
      fab>
      <v-icon>
        fas fa-times
      </v-icon>
    </v-btn>
  </form>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import {validationMixin} from 'vuelidate';
  import dayjs from 'dayjs';
  import ValidationConverterMixin from '@/common/mixins/validationConverter.mixin';
  import {createEventValidation} from '@/modules/event/create/create.validation';
  import {CreateFormApi} from '@/modules/event/model/model';
  import {eventFactory} from '@/modules/event/event.factory';
  import AppInputDate from '@/common/component/appDatePicker.vue';
  import AppTimePicker from '@/common/component/appTimePicker.vue';

  @Component({
    name: 'CreateEventForm',
    mixins: [validationMixin, createEventValidation],
    components: {
      AppInputDate,
      AppTimePicker,
    },
  })
  export default class CreateEventForm extends mixins(ValidationConverterMixin) {
    createEventForm: CreateFormApi = eventFactory.initCreateForm();
    mailList: string | null = null;

    onCreate(): void {
      this.$v.$touch();
      const {isValid, list} = this.checkValidity(this.mailList);
      if (!this.$v.$invalid && isValid) {
        this.createEventForm.emailList = list.map(item => eventFactory.toMailObject(item));
        this.$emit('create', this.createEventForm);
      }
    }

    checkValidity(mailString: string | null) {
      if (!mailString) {
        return {
          isValid: false,
          list: [],
        };
      }
      const mailList = mailString.split(',');
      const isValid = this.checkMail(mailList) && this.isLessThan(mailList, 6);
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

    get minDate(): string {
      return new Date().toISOString();
    }

    get minTime(): string | null {
      const date = new Date();
      if (dayjs(new Date()).diff(this.createEventForm.date as string, 'day') === 0) {
        return `${date.getHours()}:${date.getMinutes()}`;
      }
      return null;
    }
  }
</script>
