import { RegistryReportComponent } from './registry-report/registry-report.component';
import { RegistrySearchComponent } from './registry-search/registry-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry.component';
import { RegistryObjectCardComponent } from './registry-object-card/registry-object-card.component';
import { RegistrySearchResolver } from 'src/app/modules/registry/registry.resolvers';

const routes: Routes = [
  {
    path: '',
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
        // resolve  : {
        //   dataSe: RegistrySearchResolver
        // },
        component: RegistrySearchComponent
      },
      {
        path: 'report', 
        data: {
          title: 'Реестр - Отчеты'
        },
        component: RegistryReportComponent
      },
      {
        path: 'card', 
        data: {
          title: 'Реестр - Карточка объекта'
        },
        component: RegistryObjectCardComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
