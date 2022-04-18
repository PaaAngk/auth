import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
      // ['link2', '/f'],
      // ['link3', '/f'],
      // ['links', [['subLink1',  '/'], ['subLink2',  '/']]],
      // ['link4', '/f'],
      // ['link5', '/f'],
      // ['link6', '/f'],
  ];
 
  activeElement = String(this.tabs[0]);

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
}
