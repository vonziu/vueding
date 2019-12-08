<template>
  <section>
    <slot name="info"/>
    <section class="d-flex justify-content-center w-100">
      <v-btn
        :to="to"
        type="submit"
        :color="$appConstants.COLOR_PRIMARY"
        large>
        Sign in
      </v-btn>
    </section>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'OnSuccess',
  })
  export default class OnComplete extends Vue {
    @Prop({required: true, type: String})
    readonly to!: string
  }
</script>
