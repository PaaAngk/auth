import { AuthUser } from '@core/models/User';
import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user/me')
      .subscribe({
        next : (data) => {this.setAuth(this.jwtService.getToken(), data.user)},
        error: (e)  => {this.purgeAuth()}
      }); 
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(access_token: String, user: AuthUser) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(access_token);
    
    this.apiService.get('/user/me')
    .subscribe({
      next : (data) => {
        const userSub = data as User
        // Set current user data into observable
        this.currentUserSubject.next(userSub);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
      }
    });
    
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }

  getUser(){
    var user : User = {} as User;
    this.apiService.get('/user/me')
    .subscribe({
      next : (data) => {user = data as User, console.log(data)}
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

  attemptAuth(type: string, user: AuthUser): Observable<any> {
    var formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);

    return this.apiService.post(`/auth/sign-in`, formData)
    .pipe(
      map((token) => {
        if (token.length == 0) {
          return token;
        }
        else{
          this.setAuth(token.access_token, user);
        }
        return token;
      }),
      take(1)
    );
  }
}
