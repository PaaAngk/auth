import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'profile',
    component: UserComponent,
    resolve: {
      user: UserResolver
    },
    data: {
      title: '111'
    }
    // children: [
    //   {
    //     path: 'profile',
    //     component: ProfileComponent,
    //     data: {
    //       title: 'Профиль'
    //     }
    //   },
    //   {
    //     path: 'settings',
    //     component: SettingsComponent,
    //     data: {
    //       title: 'Настройки профиля'
    //     }
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
