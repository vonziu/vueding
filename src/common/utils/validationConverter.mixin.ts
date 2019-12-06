import Vue from 'vue';
import { Component } from 'vue-property-decorator';
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
}
