<template>
  <v-snackbar
    @close="$emit('close')"
    :color="resolveType.background"
    v-model="snackbarState"
  >
    <slot name="info"/>
    <v-btn
      :color="resolveType.color"
      text
      @click="$emit('close')"
    >
      <v-icon>fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator';

  @Component({
    name: 'appSnackbar',
  })
  export default class AppSnackbar extends Vue {
    @Prop({required: true, type: Boolean})
    readonly isOpen!: boolean;
    @Prop({type: String})
    readonly type!: String;

    snackbarState: boolean = false;

    @Watch('isOpen', {immediate: true})
    onTypeChange(newVal: boolean) {
      this.snackbarState = newVal;
    }

    get resolveType(): { background: string | null, color: string | null } {
      const type = this.type ? this.type.toLowerCase() : null;
      switch (type) {
        case 'error':
          return {
            background: '#b93030',
            color: 'white',
          };
        case 'info':
          return {
            background: 'blue darken-4',
            color: 'white',
          };
        case 'success':
          return {
            background: 'primary',
            color: 'white',
          };
        default:
          return {
            background: null,
            color: '#42b983',
          };
      }
    }
  }
</script>

<style scoped>

</style>
