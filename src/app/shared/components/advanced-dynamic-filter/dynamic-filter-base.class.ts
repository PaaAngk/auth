export class DynamicFilterBase<T> {
  value: T|undefined;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  required: boolean;
  minLength: number;
  maxLength: number | null;
  validationPatern: string;
  options: {key: string, value: string|number}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      minLength?: number;
      maxLength?: number | null;
      validationPatern?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.minLength = options.minLength || 0;
    this.maxLength = options.maxLength || null;
    this.validationPatern = options.validationPatern || '';
    this.options = options.options || [];
  }
}
