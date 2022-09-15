import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

import { DynamicFilterBase, DynamicFilterInput } from './dynamic-filter-base.class';

@Injectable()
export class DynamicFilterControlService {
	constructor() { }

	toFormGroupFromInputs(filters: DynamicFilterInput<string>[] ) {
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

	toFormGroupFromBase(segmentForm: DynamicFilterBase<any | any[]>[] ) {
		const filtersGroup: any = {};
		segmentForm.forEach(filters  => {
			//const group: any = {};
			filters.dynamicFilterInputs.forEach(filterItem  => {
				if(filterItem.type === 'combobox' || filterItem.type === 'dropdown'){
					filtersGroup[filterItem.key] = new FormControl();
				}
				else{
					filtersGroup[filterItem.key] = new FormControl(filterItem.value || '');
				}
				filterItem.required ? filtersGroup[filterItem.key].addValidators([ Validators.required ]) : null;
				filterItem.minLength ? filtersGroup[filterItem.key].addValidators([Validators.minLength(filterItem.minLength)]) : null;
				filterItem.maxLength ? filtersGroup[filterItem.key].addValidators([Validators.maxLength(filterItem.maxLength)]) : null;
				filterItem.validationPatern ? filtersGroup[filterItem.key].addValidators([Validators.pattern(filterItem.validationPatern)]) : null;
				filterItem.type == 'email' ? filtersGroup[filterItem.key].addValidators([Validators.email]): null;
			});
			//filtersGroup[filters.title] = new FormGroup(group)
		});
		return new FormGroup(filtersGroup);
	}
}
