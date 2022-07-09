import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { RegistryRoutingModule } from './registry-routing.module'
import { RegistrySearchComponent } from './search/search.component'
import {ReactiveFormsModule} from '@angular/forms';

import { TuiLinkModule, TuiSvgModule, TuiTextfieldControllerModule, TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';
import { TuiTreeModule, TuiArrowModule, TuiCheckboxLabeledModule, TuiInputCountModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTableModule, TuiReorderModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

@NgModule({
  imports: [
    CommonModule,
    RegistryRoutingModule,
    ReactiveFormsModule,

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
  ],
  declarations: [RegistryComponent, RegistrySearchComponent]
})
export class RegistryModule { }
