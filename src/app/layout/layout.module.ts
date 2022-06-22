import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from '../shared/directives';

import {TuiTabsModule } from '@taiga-ui/kit';
import {TuiHostedDropdownModule, TuiDataListModule} from '@taiga-ui/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
    //TUI
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    
  ],
  declarations: [
    LayoutComponent,
    ShowAuthedDirective,
  ]
})
export class LayoutModule { }
