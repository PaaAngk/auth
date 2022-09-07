import { AdvancedDynamicFilterModule } from './advanced-dynamic-filter.module';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { DynamicFilterBase } from './dynamic-filter-base.class';

import { TextboxDynamicFilter } from './inputs/dynamic-filter-textbox';
import { DropdownDynamicFilter } from './inputs/dynamic-filter-dropdown';
import { CountboxDynamicFilter } from './inputs/dynamic-filter-countbox';
import { DateRangeDynamicFilter } from './inputs/dynamic-filter-dateRange';
import { DateDynamicFilter } from './inputs/dynamic-filter-date';


@Injectable({
	providedIn: AdvancedDynamicFilterModule
})
export class DynamicFilterService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: DynamicFilterBase<string|number>[] = [

      new DropdownDynamicFilter({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),

      new TextboxDynamicFilter({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new CountboxDynamicFilter({
        key: 'count',
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
}
