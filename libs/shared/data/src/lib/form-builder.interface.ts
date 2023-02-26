import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

export interface IFormData {
  [key: string]: any;
}

export type IFormField = FormlyFieldConfig

export type IFormFields = Array<IFormField>;

export type IFormOptions = FormlyFormOptions
