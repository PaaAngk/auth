import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { RegistryRoutingModule } from './registry-routing.module'
import { RegistrySearchComponent } from './registry-search/registry-search.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TuiLinkModule, TuiSvgModule, TuiTextfieldControllerModule, TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';
import { TuiTreeModule, TuiArrowModule, TuiCheckboxLabeledModule, TuiInputCountModule, TuiInputModule, TuiTabsModule, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputFilesModule, TuiFilesModule, TuiInputDateRangeModule } from '@taiga-ui/kit';
import { TuiTableModule, TuiReorderModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { RegistryObjectCardComponent } from './registry-object-card/registry-object-card.component';
import { RegistryReportComponent } from './registry-report/registry-report.component';
import { SortableTableWithPaginationComponent } from 'src/app/shared/components/sortable-table-with-pagination/sortable-table-with-pagination.component';


@NgModule({
  imports: [
    CommonModule,
    RegistryRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    TuiLetModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiSvgModule,
    TuiTablePaginationModule,
    TuiLoaderModule,
    TuiReorderModule,
    TuiPrimitiveTextfieldModule,
    TuiHostedDropdownModule,
    TuiTextfieldControllerModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiTableModule,
    TuiTreeModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
    TuiTabsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiInputFilesModule, 
    TuiFilesModule,
    TuiInputDateRangeModule,
  ],
  declarations: [RegistryComponent, RegistryReportComponent, RegistrySearchComponent, RegistryObjectCardComponent, SortableTableWithPaginationComponent]
})
export class RegistryModule { }
