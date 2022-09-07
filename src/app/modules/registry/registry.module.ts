import { AdvancedDynamicFilterModule } from './../../shared/components/advanced-dynamic-filter/advanced-dynamic-filter.module';
import { AdvancedFilterFromInterfaceComponent } from './../../shared/components/advanced-filter-from-interface/advanced-filter-from-interface.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { RegistryRoutingModule } from './registry-routing.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TuiLinkModule, TuiSvgModule, TuiTextfieldControllerModule, TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule, TuiDataListModule, TuiGroupModule } from '@taiga-ui/core';
import {TuiFilterPipeModule, TuiLetModule} from '@taiga-ui/cdk';
import { TuiStepperModule, TuiComboBoxModule, TuiDataListWrapperModule, TuiInputNumberModule, TuiTreeModule, TuiArrowModule, TuiCheckboxLabeledModule, TuiInputCountModule, TuiInputModule, TuiTabsModule, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputFilesModule, TuiFilesModule, TuiInputDateRangeModule, TuiFilterByInputPipeModule } from '@taiga-ui/kit';
import { TuiTableModule, TuiReorderModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

import { RegistryReportComponent } from './registry-report/registry-report.component';
import { SortableTableWithPaginationComponent } from 'src/app/shared/components/sortable-table-with-pagination/sortable-table-with-pagination.component';
import { RegistryDownloadComponent } from './registry-download/registry-download.component';
import { RegistryDownloadFormComponent } from './registry-download/registry-download-form/registry-download-form.component';
import { RegistryObjectCardComponent } from './registry-object-card/registry-object-card.component';
import { RegistrySearchComponent } from './registry-search/registry-search.component'
import { RegistryRequestComponent } from './registry-request/registry-request.component';


@NgModule({
  imports: [
    CommonModule,
    RegistryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AdvancedDynamicFilterModule,

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
    
    TuiFilterByInputPipeModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterPipeModule,
    TuiInputNumberModule,
    TuiStepperModule,
  ],
  declarations: [
    RegistryComponent, 
    RegistryReportComponent, 
    RegistrySearchComponent, 
    RegistryObjectCardComponent, 
    SortableTableWithPaginationComponent,
    RegistryDownloadComponent,
    RegistryDownloadFormComponent,
    RegistryRequestComponent,
  ]
})
export class RegistryModule { }
