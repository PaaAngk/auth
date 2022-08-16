import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Riur } from './registry.types';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RegistryService
{
    private _searchData: BehaviorSubject<Riur[]> = new BehaviorSubject(null as unknown as Riur[]);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get registry search data
     */
    getSearchData(query : string): Observable<any>
    {
        return this._httpClient.get<Riur[]>(`http://localhost:3000/real-estate${query}`).pipe(
            tap((response: Riur[]) => {
                this._searchData.next(response);
                
            })
        );
    }

    /**
     * Reset the registry search data
     */
    // resetChat(): void
    // {
    //     this._searchData.next(null);
    // }
}
