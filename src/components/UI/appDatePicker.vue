<template>
  <v-menu
    :close-on-content-click="false"
    :return-value.sync="date"
    min-width="290px"
    offset-y
    ref="menu"
    style="z-index: 1237000"
    transition="scale-transition"
    v-model="menu"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        dark
        :error-messages="errorMessages"
        :label="label"
        prepend-inner-icon="fas fa-calendar-day"
        readonly
        ref="input"
        :value="date"
        solo
        v-on="on"
      />
    </template>
    <v-date-picker no-title scrollable v-model="date" :min="min ? min : null">
      <div class="flex-grow-1"></div>
      <v-btn @click="menu = false" color="primary" text>Cancel</v-btn>
      <v-btn @click="save(date)" color="primary" text>OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({name: 'AppInputDate'})
  export default class AppInputDate extends Vue {
    public date: string = '';

    @Prop()
    public readonly label!: string;

    @Prop()
    public readonly min!: Date;

    @Prop()
    public readonly errorMessages!: Array<string>;

    @Prop()
    public readonly initialDate!: string;

    public menu: boolean = false;


    public mounted() {
      if (this.initialDate) {
        this.date = this.initialDate;
      }
    }

    public save(date: string): void {
      // @ts-ignore
      this.$refs.menu.save(date);
      this.$emit('input', (this.$refs.input as HTMLInputElement).value);
    }
  }
</script>

<style scoped>

</style>
