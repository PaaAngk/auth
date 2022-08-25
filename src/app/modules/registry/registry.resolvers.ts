import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistryService } from 'src/app/modules/registry/registry.service';
import { Riur, User } from './registry.types';

@Injectable({
    providedIn: 'root'
})
export class RegistrySearchResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private  _registryService : RegistryService,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Riur[]> | any
    {
        let query = route.queryParams['regSection'] == 'real-estate'  ? '': `?category=${route.queryParams['regSection']}`
        console.log(query)
        return this._registryService.getSearchData(query);
    }
}

@Injectable({
    providedIn: 'root'
})
export class RegistryReportResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private  _registryService : RegistryService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>
    {
        return this._registryService.getUsersData();
    }
}
