import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Page404Component } from '@shared/*';


const userRoutes: Routes = [
  {
    path: '',
    //redirectTo: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
    canActivateChild : [AuthGuard],
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Профиль'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Настройки профиля'
        }
      }
    ]
  },
  {
    path:'**',
    component: Page404Component,
    data: {
      title: 'Ошибка!'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
