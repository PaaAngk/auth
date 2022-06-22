import { AuthUser } from '@core/models/User';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from '../api.service';
import { User } from './user.types';
import { map ,  distinctUntilChanged, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor (
    private apiService: ApiService,
  ) {}

  getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }

  getUser(){
    var user : User = {} as User;
    this.apiService.get('/user/me')
    .subscribe({
      next : (data) => {user = data as User}
    });
    return user;
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }
}
