import { DynamicFilterService } from './../../shared/components/advanced-dynamic-filter/dynamic-filter.service';
import { DynamicFilterInput, DynamicFilterBase } from './../../shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html'
})
export class RegistryComponent implements OnInit {
  
	questions$: Observable<DynamicFilterInput<any>[]>;
	segmentForm$: Observable<DynamicFilterBase<any | any[]>>;

	constructor(
		private dynamicFilterService: DynamicFilterService
	) {
		this.questions$ = dynamicFilterService.getQuestions();
		this.segmentForm$ = dynamicFilterService.getVal();
	}

	ngOnInit() {
	}

}
