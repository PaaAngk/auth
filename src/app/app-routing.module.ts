import { ErrorAccessComponent } from './shared/components/layout/error-access/error-access.component';
import { AuthGuard } from '@core/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from '@shared/*';
import { Title } from '@angular/platform-browser';


const routes: Routes = [
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      canActivate: [AuthGuard],
      data: {
          title: 'User'
      }
    },
    {
      path: 'access-danied',
      component: ErrorAccessComponent,
      data: {
          title: 'Ошибка доступа'
      }
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
//{ enableTracing: true }