import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteInfo, User } from '@core/models';
import { ROUTES } from './menu-items';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  ROUTES : RouteInfo[] = ROUTES;
  currentUser!:User;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data as User;
  }
}
