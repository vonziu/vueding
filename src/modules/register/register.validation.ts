import {
  email,
  minLength,
  required,
  sameAs,
} from 'vuelidate/lib/validators';

export const registerValidation = {
  validations: {
    registerApi: {
      mail: {
        email,
        required,
      },
      name: {
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
