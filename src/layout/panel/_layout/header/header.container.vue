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
  import Hamburger from '@/layout/panel/_layout/header/hamburger.vue';
  import UserMenu from '@/layout/panel/_layout/header/userMenu.vue';
  import {User} from '@/common/types';
  import AppOverlay from '@/common/component/appOverlay.vue';
  import {notificationRepository} from '@/common/repository/notification.repository';
  import {authRepository} from '@/common/repository/auth.repository';
  import {storageRepository} from '@/common/repository/storage.repository';

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
        await authRepository.signOut();
        storageRepository.clear();
        this.$store.commit('setUser', null);
        await this.$router.push({name: 'login'});
      } catch (e) {
        notificationRepository.error(e);
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
