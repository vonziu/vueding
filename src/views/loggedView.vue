<template>
  <main>
    <AppSidebar/>
    <AppHeader/>
    <section class="content">
      <transition mode="out-in" name="fade">
        <router-view/>
      </transition>
    </section>
  </main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ResizeObserver from 'resize-observer-polyfill';
  import AppHeader from '@/components/UI/_layout/header/headerContainer.vue';
  import AppSidebar from '@/components/UI/_layout/sidebar/sidebarContainer.vue';
  import AppOverlay from '@/components/UI/appOverlay.vue';

  @Component({
    name: 'PanelView',
    components: {
      AppHeader,
      AppSidebar,
      AppOverlay,
    },
  })
  export default class PanelView extends Vue {
    public async mounted() {
      this.setScreenWidth();
    }

    private setScreenWidth(): void {
      if (typeof window !== 'undefined') {
        const el: Element | null = document.querySelector('.v-application');
        const observer = new ResizeObserver((entries) => {
          const width: number = Math.floor(entries[0].contentRect.width);
          this.$store.commit('sidebar/setCurrentWidth', width);
          if (width > 1000) {
            this.$store.commit('sidebar/setSidebarState', false);
          }
        });
        if (el) {
          observer.observe(el);
        }
      }
    }
  }
</script>
<style scoped>
  .content {
    padding-left: 280px;
  }

  @media (max-width: 1000px) {
    .content {
      padding-left: 0;
    }
  }
</style>
