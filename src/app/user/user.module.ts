import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import {TuiScrollbarModule} from '@taiga-ui/core';
import { VerticalNavComponent } from 'src/app/ui/vertical-nav/vertical-nav.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    TuiScrollbarModule,
    
  ],
  declarations: [UserComponent, VerticalNavComponent]
})
export class UserModule { }
