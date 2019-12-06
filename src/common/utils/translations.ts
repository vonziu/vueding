export default {
  required: 'Field ${} is required',
  minLength: 'Field ${} is too short',
  numeric: 'Field ${} must be a number',
  email: 'Field ${} must be a valid email address',
  sameAsPassword: 'Passwords must be the same',
  mustBeTrue: 'Field ${} must be selected',
  not: 'Field ${} must be diffrent than old password',
  minValue: 'Field ${} must be greater than 0',
  decimal: 'Field ${} must be greater than 0',
  macAddress: 'Field ${} must be valid MAC address',
} as { [key: string]: string };
