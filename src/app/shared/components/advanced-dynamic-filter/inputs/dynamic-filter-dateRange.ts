import { DynamicFilterBase } from './../dynamic-filter-base.class';

export class DateRangeDynamicFilter extends DynamicFilterBase<number> {
  override controlType = 'dateRange';
  override type = 'dateRange';
}
