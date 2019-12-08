<template>
  <v-menu
    z-index="401"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    max-width="290px"
    min-width="290px"
    offset-y
    ref="menu"
    transition="scale-transition"
    v-model="menu2"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        dark
        :label="label"
        :errorMessages="errorMessages"
        prepend-inner-icon="fas fa-clock"
        readonly
        ref="timepicker"
        v-model="time"
        v-on="on"
        solo
      />
    </template>
    <v-time-picker
      format="24hr"
      @change="save"
      :allowed-minutes="allowedMinutes"
      :min="min"
      full-width
      v-if="menu2"
      v-model="time"
    />
  </v-menu>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({name: 'AppTimePicker'})
  export default class AppTimePicker extends Vue {
    @Prop()
    public readonly label!: string;

    @Prop()
    public initialTime!: string;

    @Prop()
    public readonly min!: string;
    @Prop()
    public readonly allowedMinutes!: Array<string>;

    @Prop()
    public readonly errorMessages!: Array<string>;

    public time: string | null = null;

    public menu2: boolean = false;

    private mounted() {
      this.time = this.initialTime;
    }

    public save(time: string): void {
      // @ts-ignore
      this.$refs.menu.save(time);
      this.$emit('input', (this.$refs.timepicker as HTMLInputElement).value);
    }
  }
</script>

<style scoped>

</style>
