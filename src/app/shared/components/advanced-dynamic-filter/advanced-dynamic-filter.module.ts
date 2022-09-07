import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedDynamicFilterComponent } from './advanced-dynamic-filter.component';
import { DynamicFilterItemComponent } from './dynamic-filter-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputNumberModule, TuiInputModule, TuiInputDateRangeModule, TuiInputDateModule, TuiFieldErrorPipeModule, TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiErrorModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule } from '@taiga-ui/core';


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
    TuiDropdownModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiSelectModule,
    TuiButtonModule
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
