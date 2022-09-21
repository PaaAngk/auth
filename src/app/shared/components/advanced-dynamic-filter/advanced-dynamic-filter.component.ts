import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFilterInput, DynamicFilterBase } from './dynamic-filter-base.class';
import { DynamicFilterControlService } from './dynamic-filter-control.service';

@Component({
  selector: 'app-advanced-dynamic-filter',
  templateUrl: './advanced-dynamic-filter.component.html',
  providers: [ DynamicFilterControlService ]
})
export class AdvancedDynamicFilterComponent implements OnInit {
	activeMenuItemIndex:number = 0;

	@Output() visibilitySidebarFilter = new EventEmitter<boolean>();

	@Output() formValues = new EventEmitter<any>();

	@Input() segmentForms: DynamicFilterBase<any | any[]>[] | null;
	filtersForm!: FormGroup;

	constructor(private dfs: DynamicFilterControlService) {}

	toogleVisibilitySidebarFilter(visibilitySidebarFilter: boolean) {
		this.visibilitySidebarFilter.emit(visibilitySidebarFilter);
	}

	ngOnInit() {
		this.filtersForm = this.dfs.toFormGroupFromBase(this.segmentForms as DynamicFilterBase<any | any[]>[]);
	}

	/**
	 * Getting data from form with delete nullable input and formate output in JSON. Also concate match checkbox to onse array of his input.
	 */
	onSubmit() {
	
		let rowValue = this.filtersForm.getRawValue();
		
		let valueWithoutNull : { [index: string | number]: any } = {};
		for (let key in rowValue){
			let val = rowValue[key];
			let nameMatchValue = key+'!!match';
			if ( val !== null){
				if (!key.includes('!!match')) {
					if (rowValue.hasOwnProperty(nameMatchValue)) {
						if (val){	
							valueWithoutNull[key] = [val, rowValue[nameMatchValue]]
						}
					}
					else{
						valueWithoutNull[key] = val
					}
				}
			}
		}

		// Object.fromEntries(
		// 	Object.entries(rowValue).filter(
		// 	  ([k, v], i) => (v !== null)
		// 	)
		// )

		this.formValues.emit(JSON.stringify(valueWithoutNull));
		this.visibilitySidebarFilter.emit(false);
  	}
}
