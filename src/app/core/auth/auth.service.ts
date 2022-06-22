import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { ApiService, JwtService } from '@core/services';
import { User } from '@core/models';
import { AuthUser } from '@core/models/User';
import { UserService } from '@core/services/user/user.service';

@Injectable()
export class AuthService
{ 
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    constructor (
      private userService: UserService,
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
          this.userService.currentUserSubject.next(userSub);
          // Set isAuthenticated to true
          this.isAuthenticatedSubject.next(true);
        }
      });
      
    }
  
    purgeAuth() {
      // Remove JWT from localstorage
      this.jwtService.destroyToken();
      // Set current user to an empty object
      this.userService.currentUserSubject.next({} as User);
      // Set auth status to false
      this.isAuthenticatedSubject.next(false);
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
