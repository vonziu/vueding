<template>
  <nav class="nav" :class="{'nav--open': sidebarState && currentWidth < 1000}">
    <section @click="changeRoute('events')" class="nav__logo">
      <h1>Vueding</h1>
    </section>
    <ul class="nav__list">
      <li :class="{'nav__list__item--active': isCurrentRouteActive('events')}"
          class="nav__list__item"
          @click="changeRoute('events')">
        <v-icon
          :color="$appConstants.COLOR_WHITE"
          size="30px">
          fab fa-elementor
        </v-icon>
        <h4 class="ml-3">
          Events
        </h4>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: 'SidebarContainer',
  })
  export default class SidebarContainer extends Vue {
    get sidebarState(): boolean {
      return this.$store.getters['sidebar/getSidebarState'];
    }

    get currentWidth(): boolean {
      return this.$store.getters['sidebar/getCurrentWidth'];
    }

    changeRoute(route: string): void {
      this.$router.push({name: route});
      this.$store.commit('sidebar/setSidebarState', false);
    }

    isCurrentRouteActive(name: string): boolean {
      return this.$route.matched.some(matcher => matcher.name === name);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../styles/variables";
  .nav {
    position: fixed;
    z-index: 3;
    left: 0;
    min-width: 280px;
    min-height: 100vh;
    background: $color-dark;
    transition-duration: 0.3s;

    &__logo {
      cursor: pointer;
      min-height: 80px;
      max-height: 80px;
      text-align: center;
      display: flex;
      align-items: center;
      color: white;
      justify-content: center;
      width: 100%
    }

    &__list {
      padding: 0;
      list-style-type: none;

      &__item {
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        min-height: 50px;
        padding: 12px;

        &--active {
          background: $primary-color;
        }
      }
    }
  }

  @media all and (max-width: 1000px) {
    .nav {
      left: -280px;
      transition-duration: 0.3s;
    }
    .nav--open {
      left: 0;
    }
  }

  @media all and (max-width: 400px){
    .nav {
      min-width: 220px;
      max-width: 220px;
    }
  }
</style>
