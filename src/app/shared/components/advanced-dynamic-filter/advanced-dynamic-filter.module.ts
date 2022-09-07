import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedDynamicFilterComponent } from './advanced-dynamic-filter.component';
import { DynamicFilterItemComponent } from './dynamic-filter-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputNumberModule, TuiInputModule, TuiInputDateRangeModule, TuiInputDateModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiErrorModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule } from '@taiga-ui/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //TUI
    TuiInputModule,
    TuiInputNumberModule,
    TuiPrimitiveTextfieldModule,
    TuiInputDateRangeModule,
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
  ],
  declarations: [
    AdvancedDynamicFilterComponent, 
    DynamicFilterItemComponent,
  ],
  exports: [
    AdvancedDynamicFilterComponent
  ]
})
export class AdvancedDynamicFilterModule { }
