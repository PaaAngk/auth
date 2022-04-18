import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.less'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page404Component {
  today: number = Date.now();
}
