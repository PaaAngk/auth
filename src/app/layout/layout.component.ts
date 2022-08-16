import { UserService } from '@core/services';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/services/user/user.types';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  
  activeMenuItemIndex : number = 0;

  readonly groups = [
      {
          label: `Components`,
          items: [
              {
                  label: 'Input',
                  routerLink: '/components/input',
              },
              {
                  label: 'Select',
                  routerLink: '/components/select',
              },
              {
                  label: 'DataList',
                  routerLink: '/components/data-list',
              },
          ],
      },
      {
          label: `Styles`,
          items: [
              {
                  label: `Icons`,
                  routerLink: '/icons',
              },
              {
                  label: `Typography`,
                  routerLink: '/typography',
              },
          ],
      },
      {
          label: '',
          items: [
              {
                  label: `Changelog`,
                  routerLink: '/changelog',
              },
          ],
      },
  ];


  currentUser!: User;
  today: number = Date.now();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser()
  }

  readonly dropdown = ['Carol Cleveland', 'Neil Innes'];

  getUser(){
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

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
    this.authService.purgeAuth();
    this.router.navigateByUrl('/');
  }


}
