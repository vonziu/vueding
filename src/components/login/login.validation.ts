import {
  email,
  minLength,
  required,
} from 'vuelidate/lib/validators';

// eslint-disable-next-line import/prefer-default-export
export const loginValidation = {
  validations: {
    loginApi: {
      mail: {
        email,
        required,
      },
      password: {
        minLength: minLength(8),
        required,
      },
    },
  },
};
