<template>
  <v-dialog
    v-model="isOpen"
    width="500"
  >
    <main style="background: white; padding: 15px">
      <h2>Confirmation</h2>
      <div class="hr"></div>
      <div class="mt-4 d-flex flex-wrap align-items-center text-center">
        <slot name="info"/>
      </div>
      <div class="hr"></div>
      <section class="mt-4 w-100 d-flex justify-content-end">
        <v-btn
          @click="$emit('confirmed')"
          :color="$appConstants.COLOR_PRIMARY"
          class="mr-3">
          Proceed
        </v-btn>
        <v-btn @click="$emit('close')">
          Close
        </v-btn>
      </section>
    </main>
  </v-dialog>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'appConfirmModal.vue',
  })
  export default class ConfirmModal extends Vue {
    @Prop({required: true, type: Boolean})
    readonly isOpen!: boolean
  }
</script>

<style scoped>

</style>
