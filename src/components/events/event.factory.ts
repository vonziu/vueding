import {CreateFormApi, Events, Mail} from '@/components/events/model/model';

function toEventList(data: any, id: string): Events {
  return {
    ...data,
    id,
  };
}

function initCreateForm(): CreateFormApi {
  return {
    name: null,
    location: null,
    date: new Date().toISOString().substr(0, 10),
    time: null,
    description: null,
    emailList: null,
  };
}

function toMailObject(item: string): Mail {
  return {
    mail: item,
    hasConfirmed: false,
  };
}

export default {
  toEventList,
  initCreateForm,
  toMailObject,
};
