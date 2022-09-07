import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

import { DynamicFilterBase } from './dynamic-filter-base.class';

@Injectable()
export class DynamicFilterControlService {
	constructor() { }

	toFormGroup(filters: DynamicFilterBase<string>[] ) {
		const group: any = {};

		filters.forEach(question => {
			// if(question.type === 'dateRange'){
			// 	group[question.key] = new FormControl(new TuiDayRange(new TuiDay(2018, 2, 10), new TuiDay(2018, 3, 20)));
			// }
			//else{
			group[question.key] = new FormControl(question.value || '');
			//}
			question.required ? group[question.key].addValidators([ Validators.required ]) : null;
			question.minLength ? group[question.key].addValidators([Validators.minLength(question.minLength)]) : null;
			question.maxLength ? group[question.key].addValidators([Validators.maxLength(question.maxLength)]) : null;
			question.validationPatern ? group[question.key].addValidators([Validators.pattern(question.validationPatern)]) : null;
			question.type == 'email' ? group[question.key].addValidators([Validators.email]): null;
		});
		return new FormGroup(group);
	}
}
