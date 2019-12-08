<template>
  <main>
    <section class="col-12 d-flex flex-wrap justify-content-between align-items-baseline p-12">
      <h2>Events</h2>
      <v-btn large color="#2e2f33" dark @click="openSlider = true; openCreate = true">
        <v-icon size="18px" class="mr-2">fas fa-plus</v-icon>
        Create event
      </v-btn>
    </section>
    <section class="w-100 d-flex flex-wrap">
        <EventCard
          @openDetails="handleOpenDetails"
          @openUpdate="handleOpenUpdate"
          @removeEvent="handleRemove"
          :event="event"
          :key="event.id"
          v-for="event in eventList"/>
    </section>
    <EmptyPlaceholder
      :is-empty="eventList.length === 0"
      :processing="processing"/>
    <DetailsContainer
      @close="handleCloseSlider"
      :is-open="openSlider"
      :type="resolveHeader">
      <template #form>
        <CreateEventForm
          v-if="openCreate"
          @close="handleCloseSlider"
          @create="handleCreate"/>
        <UpdateEventForm
          v-if="openUpdate"
          @close="handleCloseSlider"
          @update="handleUpdate"
          :event="selectedEvent"
          :open="openUpdate"/>
        <InfoDetails
          v-if="openDetails"
          :event="selectedEvent"
          @close="handleCloseSlider"/>
      </template>
    </DetailsContainer>
    <ConfirmModal
      @close="openConfirm= false"
      @confirmed="handleConfirmed"
      :is-open="openConfirm">
      <template #info>
        <h4 class="w-100">Are you sure ?</h4>
        <h4 class="w-100"> This operation cannot be reverted</h4>
      </template>
    </ConfirmModal>
  </main>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import EventCard from '@/components/events/card.vue';
  import DetailsContainer from '@/components/events/details.vue';
  import EventsRepository from '@/components/events/event.repository';
  import {CreateFormApi, Events, UpdateFormApi} from '@/components/events/model/model';
  import NotificationService from '@/common/service/NotificationService';
  import CreateEventForm from '@/components/events/create/form.vue';
  import UpdateEventForm from '@/components/events/update/update.vue';
  import InfoDetails from '@/components/events/info/info.vue';
  import {User} from '@/common/model/firebase.types';
  import EmptyPlaceholder from '@/components/UI/EmptyPlaceholder.vue';
  import ConfirmModal from '@/components/UI/ConfirmModal.vue';

  @Component({
    name: 'eventsContainer',
    components: {
      EventCard,
      DetailsContainer,
      CreateEventForm,
      UpdateEventForm,
      EmptyPlaceholder,
      InfoDetails,
      ConfirmModal,
    },
  })
  export default class EventsContainer extends Vue {
    public eventList: Events[] = [];
    public openCreate: boolean = false;
    public openUpdate: boolean = false;
    public openDetails: boolean = false;
    public openSlider: boolean = false;
    public processing: boolean = true;
    public selectedEvent: Events | null = null;
    public openConfirm: boolean = false;
    private deleteId: string | null = null;

    @Watch('user', {immediate: true})
    onUserReady() {
      if (Object.keys(this.user).length > 0) {
        this.fetchEvents();
      }
    }

    private async fetchEvents() {
      try {
        this.eventList = await EventsRepository.fetchEvents(this.user.uid);
        this.processing = false;
      } catch (e) {
        NotificationService.error(e);
      }
    }

    async handleCreate(api: CreateFormApi): Promise<void> {
      try {
        await EventsRepository.saveEvent(api, this.user.uid);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        NotificationService.error(e);
      }
    }

    async handleUpdate(api: UpdateFormApi): Promise<void> {
      try {
        const id = this.selectedEvent ? this.selectedEvent.id : null;
        await EventsRepository.updateEvent({...this.selectedEvent, ...api}, id as string);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        NotificationService.error(e);
      }
    }

    async handleConfirmed(): Promise<void> {
      try {
        await EventsRepository.removeEvent(this.deleteId as string);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        NotificationService.error(e);
      }
    }

    handleOpenDetails(event: Events): void {
      this.selectedEvent = event;
      this.openDetails = true;
      this.openCreate = false;
      this.openUpdate = false;
      this.openSlider = true;
    }

    handleCloseSlider() {
      this.openConfirm = false;
      this.openUpdate = false;
      this.openDetails = false;
      this.openCreate = false;
      this.openSlider = false;
    }

    handleOpenUpdate(event: Events): void {
      this.selectedEvent = event;
      this.openUpdate = true;
      this.openDetails = false;
      this.openCreate = false;
      this.openSlider = true;
    }

    handleRemove(id: string): void {
      this.deleteId = id;
      this.openConfirm = true;
    }


    get user(): User {
      return this.$store.getters.getUser || {};
    }

    get resolveHeader(): string {
      if (this.openDetails) {
        return 'View';
      }
      return this.openCreate ? 'Create' : 'Update';
    }
  }
</script>
