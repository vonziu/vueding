import {CreateFormApi, Events, Mail} from '@/modules/event/model/model';

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

export const eventFactory = {
  toEventList,
  initCreateForm,
  toMailObject,
};
