<template>
  <main class="confirm">
    <section class="col-sm-12">
      <v-img
        contain
        :min-height="$appConstants.APP_LOGO_MIN_HEIGHT"
        :max-height="$appConstants.APP_LOGO_MAX_HEIGHT"
        src="@/assets/logo.png"/>
      <h1>Invitation confirmed</h1>
      <p>
        Thank you for confirmation.
        Time to get ready for a party!
      </p>
      <p>You can close this tab</p>
    </section>
  </main>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {eventRepository} from '@/modules/event/event.repository';

  @Component({
    name: 'ConfirmInvitation',
  })
  export default class ConfirmInvitation extends Vue {
    mounted() {
      eventRepository.confirmAttendance(this.$route.params.eventId, this.$route.params.mail);
    }
  }
</script>

<style scoped>
  .confirm {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }
</style>
