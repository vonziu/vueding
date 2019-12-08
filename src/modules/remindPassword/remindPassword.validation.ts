import {
  email,
  required,
} from 'vuelidate/lib/validators';

// eslint-disable-next-line import/prefer-default-export
export const remindPasswordValidation = {
  validations: {
    mail: {
      email,
      required,
    },
  },
};
