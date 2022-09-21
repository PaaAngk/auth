import { DropdownDynamicFilter } from './inputs/dynamic-filter-dropdown';
import { AdvancedDynamicFilterModule } from './advanced-dynamic-filter.module';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { DynamicFilterInput, DynamicFilterBase } from './dynamic-filter-base.class';

import { TextboxDynamicFilter } from './inputs/dynamic-filter-textbox';
import { ComboboxDynamicFilter } from './inputs/dynamic-filter-combobox';
import { CountboxDynamicFilter } from './inputs/dynamic-filter-countbox';
import { DateRangeDynamicFilter } from './inputs/dynamic-filter-dateRange';
import { DateDynamicFilter } from './inputs/dynamic-filter-date';


@Injectable({
	providedIn: AdvancedDynamicFilterModule
})
export class DynamicFilterService {

	// TODO: get from a remote source of question metadata
	getQuestions() {

		const questions: DynamicFilterInput<string|string[]|number>[] = [

			new ComboboxDynamicFilter({
				key: 'combobox',
				label: 'Bravery Rating',
				placeholder:"Enter value to checkbox",
				options: [
					"Solid",
					"Great",
					"Good",
					"Unproven"
				],
				
			}),

			new DropdownDynamicFilter({
				key: 'dropdown',
				label: 'Dropdown Exapmle',
				placeholder:"Enter value to dropdown input",
				options: [
					"Solid",
					"Great",
					"Good",
					"Unproven"
				],
				
			}),

			new TextboxDynamicFilter({
				key: 'firstName',
				label: 'First name',
				value: 'Bombasto',
				placeholder:"Enter first name to input",
				//required: true
			}),

			new CountboxDynamicFilter({
				key: 'counter',
				label: 'Counter',
				value: 0,
				//required: true,
			}),
			
			// new DateDynamicFilter({
			//   key: 'date',
			//   label: 'Date entering',
			// }),

			new TextboxDynamicFilter({
				key: 'emailAddress',
				label: 'Email',
				type: 'email',
				minLength: 5
			})
		];
		//of(questions.sort((a, b) => a.order - b.order));
		return of(questions)
	}

	getFilter() {
		const segmentFilter: DynamicFilterBase<string|string[]|number>[] = [
		{
			title: "Main filter",

			dynamicFilterInputs: [
				new ComboboxDynamicFilter({
					key: 'combobox',
					label: 'Bravery Rating',
					placeholder:"Enter value to checkbox",
					options: [
						"Solid",
						"Great",
						"Good",
						"Unproven"
					],
					
				}),
	
				new DropdownDynamicFilter({
					key: 'dropdown',
					label: 'Dropdown Exapmle',
					placeholder:"Enter value to dropdown input",
					options: [
						"Solid",
						"Great",
						"Good",
						"Unproven"
					],
					match: true,
					
				}),
	
				new TextboxDynamicFilter({
					key: 'firstName',
					label: 'First name',
					value: 'Bombasto',
					placeholder:"Enter first name into input",
					required: true,
					match: true,
				}),
	
				new CountboxDynamicFilter({
					key: 'counter',
					label: 'Counter',
					value: 0,
					required: true,
				}),
				
				// new DateDynamicFilter({
				//   key: 'date',
				//   label: 'Date entering',
				// }),
	
				new TextboxDynamicFilter({
					key: 'emailAddress',
					label: 'Email',
					type: 'email',
					
					minLength: 5
				}),

				new ComboboxDynamicFilter({
					key: 'combobox123',
					label: 'Bravery Rating',
					placeholder:"Enter value to checkbox",
					options: [
						"Solid",
						"Great",
						"Good",
						"Unproven"
					],
					
				}),
	
				new DropdownDynamicFilter({
					key: 'dropdown123',
					label: 'Dropdown Exapmle',
					placeholder:"Enter value to dropdown input",
					options: [
						"Solid",
						"Great",
						"Good",
						"Unproven"
					],
					
				}),
	
				new TextboxDynamicFilter({
					key: 'firstName213',
					label: 'First name',
					value: 'Bombasto',
					placeholder:"Enter first name into input",
					required: true,
				}),
	
				new CountboxDynamicFilter({
					key: 'counter123',
					label: 'Counter',
					value: 0,
					required: true,
				}),
			]
		},
		{
			title: "Added filter 1",

			dynamicFilterInputs: [
				new TextboxDynamicFilter({
					key: 'emailAddress11',
					label: 'Email',
					type: 'email',
					match: true,
					minLength: 5
				})
			]
		},
		{
			title: "sub filter1",

			dynamicFilterInputs: [
				new DropdownDynamicFilter({
					key: 'dropdown11',
					label: 'Dropdown Exapmle',
					placeholder:"Enter value to dropdown input",
					options: [
						"Solid",
						"Great",
						"Good",
						"Unproven"
					],
					
				}),
			],
		},

		];
		return of(segmentFilter);
	}

}
