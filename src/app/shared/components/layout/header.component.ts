import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@core/models';
import { UserService } from '@core/services'

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})  
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  currentUser!: User;

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

 
  readonly tabs = [
      ['Главная', '/'],
      ['link2', '/123'],
      // ['link3', '/f'],
      // ['links', [['subLink1',  '/'], ['subLink2',  '/']]],
      // ['link4', '/f'],
      // ['link5', '/f'],
      // ['link6', '/f'],
  ];
 

  open = false;
 
  index = 0;

  onClick() {
      this.open = false;
      this.index = 1;
  }

  stop(event: Event) {
      // We need to stop tab custom event so parent component does not think its active
      event.stopPropagation();
  }


  isString(tab: Array<any>): Boolean {
      return typeof tab[1] === 'string';
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
