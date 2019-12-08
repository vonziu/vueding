<template>
  <section>
    <v-btn
      @click="$emit('toggle')"
      text
      fab>
      <v-icon>
        fas fa-bars
      </v-icon>
    </v-btn>
  </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: 'hamburger',
  })
  export default class Hamburger extends Vue {}
</script>
