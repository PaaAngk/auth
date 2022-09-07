import { DynamicFilterBase } from './../dynamic-filter-base.class';

export class TextboxDynamicFilter extends DynamicFilterBase<string> {
  override controlType = 'textbox';
}
