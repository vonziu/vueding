import {
  maxLength,
  required,
} from 'vuelidate/lib/validators';

export const createEventValidation = {
  validations: {
    createEventForm: {
      name: {
        required,
      },
      location: {
        required,
      },
      date: {
        required,
      },
      time: {
        required,
      },
      description: {
        maxLength: maxLength(255),
        required,
      },
    },
  },
};
