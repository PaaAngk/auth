import { DynamicFilterBase } from './../dynamic-filter-base.class';

export class DateDynamicFilter extends DynamicFilterBase<number> {
  override controlType = 'date';
  override type = 'date';
}
