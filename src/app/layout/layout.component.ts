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
    this.authService.purgeAuth();
    this.router.navigateByUrl('/');
  }


}
