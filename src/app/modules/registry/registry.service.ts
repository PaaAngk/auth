import { ApiService } from '@core/services';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Riur, User } from './registry.types';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RegistryService
{
    private _searchData: BehaviorSubject<Riur[]> = new BehaviorSubject([] as Riur[]);
    private _userData: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for search data
     */
    get searchData$(): Observable<Riur[]>
    {
        return this._searchData.asObservable();
    }

    /**
     * Getter for user data
     */
    get userData$(): Observable<User[]>
    {
        return this._userData.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
      
    /**
     * Get registry search data
     */
    getSearchData(query : string): Observable<any>
    {        
        return this._httpClient.get<Riur[]>(`http://localhost:3000/real-estate${query}`)
        .pipe(map(response => {
            this._searchData.next(response);
            if(!response){
                return [] as Riur[]
            }
            return response;
        }));

    }

    /**
     * Get registry user data
     */
     getUsersData(): Observable<User[]>
     {
         return this._httpClient.get<User[]>('http://localhost:3000/sampleWithData').pipe(
             tap((response: User[]) => {
                //timer(3000).subscribe(dta => {this._userData.next(response), console.log(":fetch") });
                this._userData.next(response)
             })
         );
     }

    /**
     * Reset the registry search data
     */
    resetChat(): void
    {
        this._searchData.next([] as Riur[]);
    }
}
