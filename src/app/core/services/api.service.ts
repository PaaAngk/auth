import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  get<T>(path: string): Observable<any> {
    return this.http
      .get<T>(`${environment.api_url}${path}`)
      .pipe(catchError(this.handleError<any[]>(`get to ${path}`, [])));
  }

  put<T, D>(path: string, body: D): Observable<any> {
    return this.http.put<T>(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.handleError<any[]>(`put to ${path}, data: ${body}`)));
  }

  post(path: string, body: Object): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.handleError<any[]>(`post to ${path}, data: ${body}`, [])));
  }

  delete(path: string): Observable<any> {
    return this.http
    .delete(`${environment.api_url}${path}`)
    .pipe(catchError(this.handleError<any[]>(`delete to ${path}`, [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
    };
  }
}
