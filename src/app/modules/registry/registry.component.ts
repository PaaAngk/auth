import { DynamicFilterService } from './../../shared/components/advanced-dynamic-filter/dynamic-filter.service';
import { DynamicFilterInput, DynamicFilterBase } from './../../shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
})
export class RegistryComponent implements OnInit {
	open = false;
 
    readonly webApis = [`Common`, `Audio`, `Canvas`, `Geolocation`, `MIDI`, `Workers`];
 
    readonly tinkoff = [
        `Taiga-UI`,
        `ng-event-plugins`,
        `ng-polymorpheus`,
        `ng-dompurify`,
    ];
 
    toggleSidebar(open: boolean): void {
		console.log(open)
        this.open = open;
    }
  
	questions$: Observable<DynamicFilterInput<any>[]>;
	segmentForm$: Observable<DynamicFilterBase<any | any[]>[]>;

	constructor(
		private dynamicFilterService: DynamicFilterService
	) {
		
	}

	ngOnInit() {
		this.questions$ = this.dynamicFilterService.getQuestions();
		this.segmentForm$ = this.dynamicFilterService.getFilter();
	}

}
