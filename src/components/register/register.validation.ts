import {
  email,
  minLength,
  required,
  sameAs,
} from 'vuelidate/lib/validators';

// eslint-disable-next-line import/prefer-default-export
export const registerValidation = {
  validations: {
    registerApi: {
      mail: {
        email,
        required,
      },
      password: {
        minLength: minLength(8),
        required,
      },
      repeatPassword: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs('password'),
      },
    },
  },
};
