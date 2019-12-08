<template>
  <header class="header elevation-2">
    <Hamburger @toggle="onToggle"/>
    <v-spacer/>
    <UserMenu :user="user" @logout="onLogout"/>
    <AppOverlay @close="onToggle" :is-open="sidebarState && currentWidth < 1000"/>
  </header>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Hamburger from '@/components/UI/_layout/header/hamburger.vue';
  import UserMenu from '@/components/UI/_layout/header/userMenu.vue';
  import {User} from '@/common/model/firebase.types';
  import AppOverlay from '@/components/UI/appOverlay.vue';
  import NotificationService from '@/common/service/NotificationService';
  import AuthRepository from '@/common/auth/AuthRepository';

  @Component({
    name: 'AppHeader',
    components: {
      Hamburger,
      UserMenu,
      AppOverlay,
    },
  })
  export default class AppHeader extends Vue {
    get sidebarState(): boolean {
      return this.$store.getters['sidebar/getSidebarState'];
    }

    get currentWidth(): boolean {
      return this.$store.getters['sidebar/getCurrentWidth'];
    }

    get user(): User {
      return this.$store.getters.getUser || {};
    }

    onToggle(): void {
      this.$store.commit('sidebar/setSidebarState', !this.sidebarState);
    }

    async onLogout(): Promise<void> {
      try {
        await AuthRepository.signOut();
        localStorage.clear();
        this.$store.commit('setUser', null);
        await this.$router.push({name: 'login'});
      } catch (e) {
        console.log(e);
        NotificationService.error(e);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 80px;
    max-height: 80px;
    width: 100%;
    background: white;
  }
</style>
