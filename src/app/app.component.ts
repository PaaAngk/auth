import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from "@core/services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  title = 'App';
  ngOnInit() {
    this.userService.populate();
  }
}
