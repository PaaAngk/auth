import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';
import { NoAuthGuard } from '@core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  // Redirect empty path to 'home'
  {path: '', pathMatch : 'full', redirectTo: 'home'},

  // Redirect signed in user to the '/home'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: SignInComponent,
    children: [
      {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      title: 'ssss'
    },
    children: [
      //{path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
      //{path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    ]
  },

  // Landing routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component  : LayoutComponent,
    data: {
        title: 'empty'
    },
    children   : [
        {path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.HomeModule)},
    ]
  },

    // {
    //   path: 'user',
    //   loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    //   canActivate: [AuthGuard],
    //   canLoad:[AuthGuard],
    // },
    // {
    //   path: 'access-danied',
    //   component: ErrorAccessComponent,
    //   data: {
    //       title: 'Ошибка доступа'
    //   }
    // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
//{ enableTracing: true }