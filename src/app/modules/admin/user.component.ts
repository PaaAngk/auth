import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteInfo, User } from '@core/models';
import { ROUTES } from './menu-items';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  //styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  ROUTES : RouteInfo[] = ROUTES;
  currentUser!:User;
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['profile']);
    this.currentUser = this.route.snapshot.data as User;
  }
}
