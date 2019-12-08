<template>
  <section
    class="event__details"
    :class="{'event__details__open': isOpen}">
    <header class="event__details__header">
      <h2>{{type}} event</h2>
      <v-btn
        @click="$emit('close')"
        dark
        color="#c14940"
        small
        fab>
        <v-icon>fas fa-times</v-icon>
      </v-btn>
    </header>
    <slot name="form"/>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'CreateEvent',
  })
  export default class CreateEvent extends Vue {
    @Prop({required: true, type: Boolean})
    readonly isOpen!: boolean;
    @Prop({required: true, type: String})
    readonly type!: string
  }
</script>

<style lang="scss" scoped>
  .event__details {
    position: fixed;
    top: 0;
    right: -100%;
    width: 380px;
    background: #2e2f33;
    height: 100%;
    max-height: 100vh;
    overflow: auto;
    transition-duration: 0.3s;
    padding: 15px;
    color: white;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
    }

    &__open {
      right: 0;
    }
  }

  @media (max-width: 700px) {
    .event__details {
      width: 100%;
    }
  }
</style>
