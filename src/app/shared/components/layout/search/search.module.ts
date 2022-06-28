import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SearchComponent } from './search.component';
import { TuiSvgModule, TuiDataListModule } from '@taiga-ui/core';
import {TuiFilterByInputPipeModule} from '@taiga-ui/kit';


@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        RouterModule.forChild([]),
        TuiSvgModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiDataListModule,
        TuiFilterByInputPipeModule,

    ],
    exports: [
        SearchComponent
    ]
})
export class SearchModule
{
}
