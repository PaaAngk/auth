import { DynamicFilterService } from './../../shared/components/advanced-dynamic-filter/dynamic-filter.service';
import { DynamicFilterBase } from './../../shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html'
})
export class RegistryComponent implements OnInit {
  
	questions$: Observable<DynamicFilterBase<any>[]>;

	constructor(
		private dynamicFilterService: DynamicFilterService
	) {
		this.questions$ = dynamicFilterService.getQuestions();
	}

	ngOnInit() {
	}

}
