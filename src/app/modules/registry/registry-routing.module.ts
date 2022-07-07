import { RegistryReportComponent } from './report/report.component';
import { RegistrySearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry.component';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'search',
    component: RegistryComponent,
    data: {
      title: 'Реестр'
    },
    children : [
      {
        path: 'search', 
        data: {
          title: 'Реестр - Поиск'
        },
        component: RegistrySearchComponent
      },
      {
        path: 'report', 
        data: {
          title: 'Реестр - Отчеты'
        },
        component: RegistryReportComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
