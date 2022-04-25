import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { TuiInputModule, TuiInputPasswordModule, TuiFilterByInputPipeModule, TuiFieldErrorModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule, TuiErrorModule, TuiLoaderModule, TuiNotificationModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,

    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiFilterByInputPipeModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiFieldErrorPipeModule,
    TuiLoaderModule,
    TuiNotificationModule,
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
