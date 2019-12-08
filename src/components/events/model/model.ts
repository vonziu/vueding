export interface Mail {
  hasConfirmed: boolean,
  mail: string
}

export interface Events {
  date: string,
  name: string,
  time: string,
  description: string,
  location: string,
  emailList: Mail[]
  id: string
}

export interface CreateFormApi {
  name: string | null,
  location: string | null,
  date: string | null,
  time: string | null,
  description: string | null,
  emailList: null | Mail[],
}

export interface UpdateFormApi {
  name: string | null,
  description: string | null,
}
