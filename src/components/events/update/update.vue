<template>
  <form class="col-12" @submit.prevent="onUpdate">
    <v-text-field
      dark
      label="Name"
      placeholder="Name"
      v-model="$v.updateEventForm.name.$model"
      :error-messages="collectErrors($v.updateEventForm.name, 'name')"
      solo/>
    <v-textarea
      label="Description"
      no-resize
      placeholder="Description"
      rows="10"
      dark
      v-model="$v.updateEventForm.description.$model"
      :error-messages="collectErrors($v.updateEventForm.description, 'description')"
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
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import {validationMixin} from 'vuelidate';
  import ValidationConverterMixin from '@/common/utils/validationConverter.mixin';
  import {updateEventValidation} from '@/components/events/update/update.validation';
  import {Events, UpdateFormApi} from '@/components/events/model/model';
  import AppInputDate from '@/components/UI/appDatePicker.vue';
  import AppTimePicker from '@/components/UI/appTimePicker.vue';

  @Component({
    name: 'CreateEventForm',
    mixins: [validationMixin, updateEventValidation],
    components: {
      AppInputDate,
      AppTimePicker,
    },
  })
  export default class CreateEventForm extends mixins(ValidationConverterMixin) {
    @Prop({required: true, type: Object})
    readonly event!: Events;
    @Prop({required: true, type: Boolean})
    readonly open!: boolean;
    updateEventForm: UpdateFormApi = {name: null, description: null};

    @Watch('open', {immediate: true})
    onOpen(val: boolean) {
      if (val) {
        const {name, description} = this.event;
        this.updateEventForm = {name, description};
      }
    }


    onUpdate(): void {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('update', this.updateEventForm);
      }
    }
  }
</script>
