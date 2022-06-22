import { VerticalNavComponent } from './vertical-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
  ],
  declarations: [VerticalNavComponent],
  exports: []
})
export class SharedModule { }
