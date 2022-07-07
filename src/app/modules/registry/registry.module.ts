import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { RegistryRoutingModule } from './registry-routing.module'
import {TuiScrollbarModule, TuiLinkModule} from '@taiga-ui/core';
import { RegistrySearchComponent } from './search/search.component'
import {TuiTreeModule, TuiCheckboxLabeledModule} from '@taiga-ui/kit';
 
@NgModule({
  imports: [
    CommonModule,
    RegistryRoutingModule,

    
    TuiTreeModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
  ],
  declarations: [RegistryComponent, RegistrySearchComponent]
})
export class RegistryModule { }
