import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ApiService } from '../core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private api: ApiService,
  ) {}

  isAuthenticated: boolean | undefined;

  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    //this.api.get('/operation').subscribe((data) => console.log(data))

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          //this.setListTo('feed');
        } else {
          //this.setListTo('all');
        }
        this.cd.markForCheck();
      }
    );

  }

}
