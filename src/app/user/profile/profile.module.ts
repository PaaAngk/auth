import { NgModule } from '@angular/core';

import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    
    ProfileRoutingModule
  ],
  declarations: [
    ProfileArticlesComponent,
    ProfileComponent
    
  ],
  providers: [
  ]
})
export class ProfileModule {}
