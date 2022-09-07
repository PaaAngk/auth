import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFilterInput, DynamicFilterBase } from './dynamic-filter-base.class';
import { DynamicFilterControlService } from './dynamic-filter-control.service';

@Component({
  selector: 'app-advanced-dynamic-filter',
  templateUrl: './advanced-dynamic-filter.component.html',
  providers: [ DynamicFilterControlService ]
})
export class AdvancedDynamicFilterComponent implements OnInit {

  	@Input() questions: DynamicFilterInput<string>[] | null = [];

	@Input() segmentForm: DynamicFilterBase<any | any[]> | null;
	form!: FormGroup;
	form1!: FormGroup;
	payLoad = '';

	constructor(private dfs: DynamicFilterControlService) {}

	ngOnInit() {
	  	this.form = this.dfs.toFormGroup(this.questions as DynamicFilterInput<string>[]);
		console.log(this.segmentForm)
		// this.segmentForm?.dynamicFilterInputs?.reduce(function forEach(r, a) {
		// 	if (a === null) {
		// 		return r;
		// 	}
		// 	if (Array.isArray(a)) {
		// 		return a.reduce(iter, r);
		// 	}
		// 	if (typeof a === 'object') {
		// 		return Object.keys(a).map(k => a[k]).reduce(iter, r);
		// 	}
		// 	return r.concat(a);
		// }, []);

		// Сделать генерацию формы по структуре массива 
		// this.form1 = this.dfs.toFormGroup(this.segmentForm?.dynamicFilterInputs as DynamicFilterInput<string>[]);
		// this.segmentForm?.dynamicFilterInputs?.forEach({

		// })

		//this.form = this.dfs.toFormGroup(this.questions as DynamicFilterInput<string>[]);
	}

	onSubmit() {
	  	this.payLoad = JSON.stringify(this.form.getRawValue());
	}
}
