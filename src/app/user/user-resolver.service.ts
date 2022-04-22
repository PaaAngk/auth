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

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User {
    const active = this.userService.getCurrentUser();
    if(!this.userService.currentUser.pipe(take(1))){
      this.router.navigateByUrl('/')
    }

    return active;
  }
}
