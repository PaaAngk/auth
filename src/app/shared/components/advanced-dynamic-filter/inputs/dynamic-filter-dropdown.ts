import { DynamicFilterBase } from './../dynamic-filter-base.class';

export class DropdownDynamicFilter extends DynamicFilterBase<string> {
  override controlType = 'dropdown';
}
