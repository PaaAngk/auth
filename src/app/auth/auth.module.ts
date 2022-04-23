import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { TuiInputModule, TuiInputPasswordModule, TuiFilterByInputPipeModule, TuiFieldErrorModule} from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule, TuiErrorModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,

    TuiInputModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiFilterByInputPipeModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
