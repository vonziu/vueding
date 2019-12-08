import {
  maxLength,
  required,
} from 'vuelidate/lib/validators';

export const updateEventValidation = {
  validations: {
    updateEventForm: {
      name: {
        required,
      },
      description: {
        maxLength: maxLength(255),
        required,
      },
    },
  },
};
