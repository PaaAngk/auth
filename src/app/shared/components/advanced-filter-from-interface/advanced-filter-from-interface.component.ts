import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// interface AdvancedFilter{
// 	title: string;
// 	advancedFilter?: AdvancedFilter;
// }

@Component({
	selector: 'advanced-filter-from-interface',
	templateUrl: './advanced-filter-from-interface.component.html'
})
export class AdvancedFilterFromInterfaceComponent implements OnInit {

	// filter : AdvancedFilter = {
	// 	title:"недвижимость",
	// 	advancedFilter: {
	// 		title : "Основыне",
	// 	}
	// }

	constructor() {}
  
	ngOnInit() {
	}
  

}
