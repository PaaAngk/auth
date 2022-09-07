import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

import { DynamicFilterInput } from './dynamic-filter-base.class';

@Injectable()
export class DynamicFilterControlService {
	constructor() { }

	toFormGroup(filters: DynamicFilterInput<string>[] ) {
		const group: any = {};

		filters.forEach(question => {
			if(question.type === 'combobox' || question.type === 'dropdown'){
				group[question.key] = new FormControl();
			}
			else{
				group[question.key] = new FormControl(question.value || '');
			}
			question.required ? group[question.key].addValidators([ Validators.required ]) : null;
			question.minLength ? group[question.key].addValidators([Validators.minLength(question.minLength)]) : null;
			question.maxLength ? group[question.key].addValidators([Validators.maxLength(question.maxLength)]) : null;
			question.validationPatern ? group[question.key].addValidators([Validators.pattern(question.validationPatern)]) : null;
			question.type == 'email' ? group[question.key].addValidators([Validators.email]): null;
		});
		return new FormGroup(group);
	}
}
