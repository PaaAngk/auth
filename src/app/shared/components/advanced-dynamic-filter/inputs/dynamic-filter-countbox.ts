import { DynamicFilterBase } from './../dynamic-filter-base.class';

export class CountboxDynamicFilter extends DynamicFilterBase<number> {
  override controlType = 'countbox';
}
