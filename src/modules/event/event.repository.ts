import firebase from 'firebase/app';
import 'firebase/firestore';
import {eventFactory} from '@/modules/event/event.factory';
import {
  CreateFormApi, Events, Mail, UpdateFormApi,
} from '@/modules/event/model/model';
import {DocumentReference} from '@/common/types';

async function fetchEvents(userId: string): Promise<Events[]> {
  const events = await firebase
    .firestore()
    .collection('event')
    .where('userId', '==', userId)
    .get();
  return events
    .docs
    .map(item => eventFactory.toEventList(item.data(), item.id));
}

function saveEvent(api: CreateFormApi, userId: string): Promise<DocumentReference> {
  return firebase
    .firestore()
    .collection('event')
    .add({...api, userId});
}

function updateEvent(api: UpdateFormApi, eventId: string): Promise<void> {
  return firebase
    .firestore()
    .collection('event')
    .doc(eventId)
    .set(api);
}

function removeEvent(eventId: string) {
  return firebase
    .firestore()
    .collection('event')
    .doc(eventId)
    .delete();
}

function eventById(eventId: string) {
  return firebase
    .firestore()
    .collection('event')
    .doc(eventId)
    .get();
}

async function confirmAttendance(eventId: string, mail: string): Promise<void> {
  const event = await eventById(eventId);
  const data = event.data();
  if (data) {
    data.emailList.forEach((object: Mail) => {
      if (object.mail === mail) {
        object.hasConfirmed = true;
      }
    });
  }
  return firebase
    .firestore()
    .collection('event')
    .doc(eventId)
    .update(data as CreateFormApi);
}

export const eventRepository = {
  fetchEvents,
  saveEvent,
  updateEvent,
  removeEvent,
  confirmAttendance,
};
