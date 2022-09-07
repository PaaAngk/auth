import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class DateDynamicFilter extends DynamicFilterInput<number> {
  override controlType = 'date';
  override type = 'date';
}
