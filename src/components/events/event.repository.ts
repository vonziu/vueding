import firebase from 'firebase/app';
import 'firebase/firestore';
import EventFactory from '@/components/events/event.factory';
import {CreateFormApi, Events, UpdateFormApi} from '@/components/events/model/model';
import {DocumentReference} from '@/common/model/firebase.types';

async function fetchEvents(userId: string): Promise<Events[]> {
  const events = await firebase
    .firestore()
    .collection('event')
    .where('userId', '==', userId)
    .get();
  return events.docs.map(item => EventFactory.toEventList(item.data(), item.id));
}

function saveEvent(api: CreateFormApi, userId: string): Promise<DocumentReference> {
  return firebase.firestore().collection('event').add({...api, userId});
}

function updateEvent(api: UpdateFormApi, eventId: string): Promise<void> {
  return firebase.firestore().collection('event').doc(eventId).set(api);
}

function removeEvent(eventId: string) {
  return firebase.firestore().collection('event').doc(eventId).delete();
}

export default {
  fetchEvents,
  saveEvent,
  updateEvent,
  removeEvent,
};
