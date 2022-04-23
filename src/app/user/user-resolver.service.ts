import { User } from '@core/models';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@core/services';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}


  //загрузка пользователя при входе на страницу user
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User {
    // if(!this.userService.currentUser.pipe(take(1))){
    //   this.router.navigateByUrl('/')
    // }

    return this.userService.getCurrentUser();
  }
}
