<template>
  <main class="p-12">
    <EventCard
      :event="event"
      presentational>
      <template #details>
        <section class="mt-4 w-100">
          <h4 class="mt-3 mb-2">
            Description
          </h4>
          <p>
            {{event.description}}
          </p>
          <v-data-table
            dark
            :headers="headers"
            :items="event.emailList"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.hasConfirmed="{ item }">
              <v-chip
                :color="item.hasConfirmed ? 'green' : 'red'"
                dark>
                {{item.hasConfirmed ? 'yes' : 'no'}}
              </v-chip>
            </template>
          </v-data-table>
        </section>
      </template>
    </EventCard>
  </main>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Events} from '@/modules/event/model/model';
  import EventCard from '@/modules/event/view/card.vue';

  @Component({
    name: 'InfoDetails',
    components: {
      EventCard,
    },
  })
  export default class InfoDetails extends Vue {
    @Prop({required: true, type: Object})
    readonly event!: Events

    get headers() {
      return [
        {
          text: 'E-mail',
          align: 'left',
          sortable: false,
          value: 'mail',
        },
        {
          text: 'Confirmed',
          align: 'left',
          sortable: false,
          value: 'hasConfirmed',
        },
      ];
    }
  }
</script>
