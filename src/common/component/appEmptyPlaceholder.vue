<template>
  <section class="text-center">
    <div v-if="!processing && isEmpty">
      <v-img
        :min-height="$appConstants.APP_LOGO_MIN_HEIGHT"
        :max-height="$appConstants.APP_LOGO_MAX_HEIGHT"
        src="@/assets/logo.png"
      contain/>
      <h3> So empty here. Add some events to make this go away</h3>
    </div>
    <div class="d-flex flex-wrap col-12" v-if="processing">
      <v-skeleton-loader
        dark
        class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
        type="list-item-three-line"
      />
      <v-skeleton-loader
        dark
        class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
        type="list-item-three-line"
      />
      <v-skeleton-loader
        dark
        class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
        type="list-item-three-line"
      />
    </div>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'appEmptyPlaceholder.vue',
  })
  export default class EmptyPlaceholder extends Vue {
    @Prop({required: true, type: Boolean})
    readonly processing!: boolean;
    @Prop({required: true, type: Boolean})
    readonly isEmpty!: boolean
  }
</script>

<style scoped>

</style>
