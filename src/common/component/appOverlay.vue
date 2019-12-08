<template>
  <v-overlay z-index="2" :value="isOpen">
    <div @click="$emit('close')" class="overlay__clickable"></div>
  </v-overlay>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'AppOverlay',
  })
  export default class AppOverlay extends Vue {
    @Prop({required: true, type: Boolean})
    readonly isOpen!: boolean
  }
</script>
<style scoped>
  .overlay__clickable {
    height: 100vh;
    width: 100vh;
  }
</style>
