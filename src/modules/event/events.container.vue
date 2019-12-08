<template>
  <main>
    <section class="col-12 d-flex flex-wrap justify-content-between align-items-baseline p-12">
      <h2>Events</h2>
      <v-btn
        large
        :color="$appConstants.COLOR_DARK"
        dark
        @click="handleOpenCreate">
        <v-icon
          size="18px"
          class="mr-2">
          fas fa-plus
        </v-icon>
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
      @close="openConfirm = false"
      @confirmed="handleConfirmed"
      :is-open="openConfirm">
      <template #info>
        <h4 class="w-100">
          Are you sure ?
        </h4>
        <h4 class="w-100">
          This operation cannot be reverted
        </h4>
      </template>
    </ConfirmModal>
  </main>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import EventCard from '@/modules/event/view/card.vue';
  import DetailsContainer from '@/modules/event/details.vue';
  import {eventRepository} from '@/modules/event/event.repository';
  import {CreateFormApi, Events, UpdateFormApi} from '@/modules/event/model/model';
  import {notificationRepository} from '@/common/repository/notification.repository';
  import CreateEventForm from '@/modules/event/create/create.form.vue';
  import UpdateEventForm from '@/modules/event/update/update.form.vue';
  import InfoDetails from '@/modules/event/info/info.vue';
  import {User} from '@/common/types';
  import EmptyPlaceholder from '@/common/component/appEmptyPlaceholder.vue';
  import ConfirmModal from '@/common/component/appConfirmModal.vue';

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
        this.eventList = await eventRepository.fetchEvents(this.user.uid);
        this.processing = false;
      } catch (e) {
        notificationRepository.error(e);
      }
    }

    async handleCreate(api: CreateFormApi): Promise<void> {
      try {
        await eventRepository.saveEvent(api, this.user.uid);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        notificationRepository.error(e);
      }
    }

    async handleUpdate(api: UpdateFormApi): Promise<void> {
      try {
        const id = this.selectedEvent ? this.selectedEvent.id : null;
        await eventRepository.updateEvent({...this.selectedEvent, ...api}, id as string);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        notificationRepository.error(e);
      }
    }

    async handleConfirmed(): Promise<void> {
      try {
        await eventRepository.removeEvent(this.deleteId as string);
        this.fetchEvents();
        this.handleCloseSlider();
      } catch (e) {
        notificationRepository.error(e);
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

    handleOpenCreate(): void {
      this.openUpdate = false;
      this.openDetails = false;
      this.openCreate = true;
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
