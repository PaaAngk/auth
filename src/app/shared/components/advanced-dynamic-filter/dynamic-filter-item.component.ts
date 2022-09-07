import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFilterInput } from './dynamic-filter-base.class';

@Component({
  selector: 'dynamic-filter-item',
  templateUrl: './dynamic-filter-item.component.html'
})
export class DynamicFilterItemComponent {
  @Input() question!: DynamicFilterInput<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
