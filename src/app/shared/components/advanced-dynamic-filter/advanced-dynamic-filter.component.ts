import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFilterBase } from './dynamic-filter-base.class';
import { DynamicFilterControlService } from './dynamic-filter-control.service';

@Component({
  selector: 'app-advanced-dynamic-filter',
  templateUrl: './advanced-dynamic-filter.component.html',
  providers: [ DynamicFilterControlService ]
})
export class AdvancedDynamicFilterComponent implements OnInit {

  	@Input() questions: DynamicFilterBase<string>[] | null = [];
	form!: FormGroup;
	payLoad = '';
  
	constructor(private dfs: DynamicFilterControlService) {}
  
	ngOnInit() {
	  	this.form = this.dfs.toFormGroup(this.questions as DynamicFilterBase<string>[]);
	}
  
	onSubmit() {
	  	this.payLoad = JSON.stringify(this.form.getRawValue());
	}
}
