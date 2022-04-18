import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  today: number = Date.now();
}
