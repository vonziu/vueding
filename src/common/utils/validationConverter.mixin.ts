import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {email} from 'vuelidate/lib/validators';
import translations from '@/common/utils/translations';


@Component
export default class ValidationConverterMixin extends Vue {
  collectErrors(error: any, fieldName?: string): string[] {
    if (error.$dirty) {
      const errorBag = Object.keys(error.$params);
      return errorBag
        .filter(err => !error[err])
        .map(item => translations[item]
          .replace('${}', fieldName ? fieldName.toLowerCase() : ''));
    }
    return [];
  }

  isMailListValid(mailString: string, isDirty: boolean, field: string): string[] {
    if (isDirty) {
      if (!mailString) {
        return [translations.required.replace('${}', field)];
      }
      if (!this.checkMail(mailString.split(','))) {
        return [translations.required.replace('${}', field)];
      }
      return [];
    }
    return [];
  }

  checkMail(list: string[]): boolean {
    // @ts-ignore
    return list.filter(mail => !email(mail.trim())).length === 0;
  }
}
