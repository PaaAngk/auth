import { Component, Input, OnInit } from '@angular/core';
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

  	@Input() questions: DynamicFilterInput<string>[] | null = [];

	@Input() segmentForms: DynamicFilterBase<any | any[]>[] | null;
	form!: FormGroup;
	filtersForm!: FormGroup;
	payLoad = '';
	filterItems ?: string[];

	constructor(private dfs: DynamicFilterControlService) {}

	ngOnInit() {
	  	this.form = this.dfs.toFormGroupFromInputs(this.questions as DynamicFilterInput<string>[]);
		this.filtersForm = this.dfs.toFormGroupFromBase(this.segmentForms as DynamicFilterBase<any | any[]>[]);
		this.filterItems = this.segmentForms?.map(element => element.title).concat(this.segmentForms?.map(element => element.title));
	}
	set(){
		console.log("dsdd")
	}
	onSubmit() {
	  	this.payLoad = JSON.stringify(this.filtersForm.getRawValue());
	}
}
