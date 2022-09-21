import { DynamicFilterService } from './../../shared/components/advanced-dynamic-filter/dynamic-filter.service';
import { DynamicFilterInput, DynamicFilterBase } from './../../shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistryComponent implements OnInit {
	open = false;
	questions$: Observable<DynamicFilterInput<any>[]>;
	segmentForm$: Observable<DynamicFilterBase<any | any[]>[]>;
 
    toggleSidebar(open: boolean): void {
		console.log(open)
        this.open = open;
    }

	constructor(
		private dynamicFilterService: DynamicFilterService
	) {
		
	}

	ngOnInit() {
		this.questions$ = this.dynamicFilterService.getQuestions();
		this.segmentForm$ = this.dynamicFilterService.getFilter();
	}

}
