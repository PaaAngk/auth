import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistryService } from 'src/app/modules/registry/registry.service';
import { Riur } from 'src/app/modules/registry/registry.types';

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
        let query = route.paramMap.get('regSection') == null ? '': `?category=${route.paramMap.get('regSection')}`
        return this._registryService.getSearchData(query);
    }
}
