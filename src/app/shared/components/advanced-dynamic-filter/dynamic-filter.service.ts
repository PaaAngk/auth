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
				order: 3
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
				order: 3
			}),

			new TextboxDynamicFilter({
				key: 'firstName',
				label: 'First name',
				value: 'Bombasto',
				placeholder:"Enter first name to input",
				required: true,
				order: 1
			}),

			new CountboxDynamicFilter({
				key: 'counter',
				label: 'Counter',
				value: 0,
				required: true,
				order: 4
			}),
			
			// new DateDynamicFilter({
			//   key: 'date',
			//   label: 'Date entering',
			// }),

			new TextboxDynamicFilter({
				key: 'emailAddress',
				label: 'Email',
				type: 'email',
				order: 2,
				minLength: 5
			})
		];

		return of(questions.sort((a, b) => a.order - b.order));
	}


	getVal() {


		const segmentFilter: DynamicFilterBase<string|string[]|number> = {
			title: "Main filter",

			dynamicFilterInputs: [

				new TextboxDynamicFilter({
					key: 'firstName',
					label: 'First name',
					value: 'Bombasto',
					placeholder:"Enter first name to input",
					required: true,
					order: 1
				})
			],

			dynamicFilterBase: [
				{
					title: "Sub0 filter",
		
					dynamicFilterInputs: [
		
						new TextboxDynamicFilter({
							key: 'emailAddress',
							label: 'Email',
							type: 'email',
							order: 2,
							minLength: 5
						})
						
					]
				},

				{
					title: "Sub1 filter",
		
					dynamicFilterInputs: [

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
							order: 3
						}),

					]
				}
			]
		};
		return of(segmentFilter);
	}

}
