import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './directives';
import { TuiButtonModule } from '@taiga-ui/core';


@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
  ],
  declarations: [ShowAuthedDirective],
  exports: [ShowAuthedDirective]
})
export class SharedModule { }
