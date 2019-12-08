<template>
  <section class="header__user">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          height="100%"
          right
          :color="$appConstants.COLOR_DARK"
          class="mr-3"
          v-on="on">
          <h4>{{user.displayName}}</h4>
          <v-icon size="16px" class="ml-2">
            fas fa-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$emit('logout')">
          <v-list-item-title class="d-flex justify-content-center">
            <v-icon size="16px">
              fas fa-sign-out-alt
            </v-icon>
            Log out
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </section>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {User} from '@/common/types';

  @Component({
    name: 'UserMenu',
  })
  export default class UserMenu extends Vue {
    @Prop({required: true})
    readonly user!: User | null
  }
</script>
<style scoped>
  .header__user {
    height: 100%;
  }
</style>
