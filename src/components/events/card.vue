<template>
  <article
    :class="{'w-100': presentational,
     'col-xl-4': !presentational,
     'col-lg-6': !presentational,
     'col-md-6': !presentational,
     'col-sm-12': !presentational
    }"
    :style="{padding: presentational ? 0 : null}">
    <section
      class="card"
      :style="{padding: presentational ? 0 : null}"
      :class="{'w-100': presentational}">
      <h1>{{event.name}}</h1>
      <div class="card__address-container">
        <v-icon
          color="#42b983"
          size="16px"
          class="card__icon">
          fas fa-map-marker-alt
        </v-icon>
        <h5>
          {{event.location}}
        </h5>
      </div>
      <h5>
        <v-icon
          color="#42b983"
          size="16px"
          class="card__icon">
          fas fa-calendar
        </v-icon>
        {{event.date}}
      </h5>
      <h5>
        <v-icon
          color="#42b983"
          size="16px"
          class="card__icon">
          fas fa-clock
        </v-icon>
        {{event.time}}
      </h5>
      <h5>
        <v-icon
          color="#42b983"
          size="16px"
          class="card__icon">
          fas fa-users
        </v-icon>
        {{event.emailList ? event.emailList.length : 0}}
      </h5>
      <div class="card__actions" v-if="!presentational">
        <v-btn
          class="mr-2 card__actions__btn"
          fab
          @click="$emit('openDetails', event)"
          color="white">
          <v-icon size="14px">fas fa-info</v-icon>
        </v-btn>
        <v-btn
          @click="$emit('openUpdate', event)"
          class="mr-2 card__actions__btn"
          fab
          color="#42b983"
          dark>
          <v-icon size="14px">fas fa-pencil-alt</v-icon>
        </v-btn>
        <v-btn
          @click="$emit('removeEvent', event.id)"
          class="card__actions__btn"
          fab
          color="red"
          dark>
          <v-icon size="14px">fas fa-trash-alt</v-icon>
        </v-btn>
      </div>
      <slot name="details"/>
    </section>
  </article>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Events} from '@/components/events/model/model';

  @Component({
    name: 'EventCard',
  })
  export default class EventCard extends Vue {
    @Prop({required: true, type: Object})
    readonly event!: Events
    @Prop({type: Boolean})
    readonly presentational!: boolean
  }
</script>

<style lang="scss" scoped>
  .card {
    padding: 15px;
    border-radius: 5px;
    color: white;
    background: #2e2f33;
    position: relative;
    word-break: break-word;
    min-height: 200px;

    &__actions {
      position: absolute;
      right: -5px;
      bottom: -5px;

      &__btn {
        height: 40px;
        min-width: 40px;
      }
    }

    &__address-container {
      display: flex;
      align-items: flex-start;
    }

    &__icon {
      max-width: 20px;
      min-width: 20px;
    }
  }

  h1 {
    font-size: 24px;
  }

  h5 {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 600px) {
    .card__actions__btn {
      height: 55px;
      min-width: 55px;
    }
  }
</style>
