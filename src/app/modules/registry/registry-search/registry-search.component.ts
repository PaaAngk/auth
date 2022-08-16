import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {EMPTY_ARRAY, TuiHandler} from '@taiga-ui/cdk';
import { TreeNode } from '@core/models' 
import {FormControl, FormGroup} from '@angular/forms';
import {defaultSort, TuiComparator} from '@taiga-ui/addon-table';
import {
    isPresent,
    toInt,
    TUI_DEFAULT_MATCHER,
    tuiReplayedValueChangesFrom,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, from, Observable, of, Subject, takeUntil, timer} from 'rxjs';
import {
    debounceTime,
    catchError,
    tap,
    filter,
    map,
    mapTo,
    share,
    startWith,
    switchMap,
    delay,
} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Riur } from './../registry.types';
import { RegistryService } from 'src/app/modules/registry/registry.service';

type Key = 'secondName' | 'firstName' | 'lastName' | 'DOB' | 'placeBirth' | 'placeLive' | 'age';
 
const KEYS: Record<string, string> = {
    'Фамилия': 'secondName',
    'Имя': 'firstName' ,
    'Отчество': 'lastName',
    'Дата рождения': 'DOB',
    'Место рождения': 'placeBirth' ,
    'Адрес': 'placeLive' ,
    'Возраст':'age'
};

@Component({
  selector: 'registry-search',
  templateUrl: './registry-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrySearchComponent implements OnInit {

    rowData: Riur[];
    filteredData: Riur[];
    loading$ :Observable<boolean>;
    total$: Observable<number>;
    data$: Observable<readonly Riur[]>;
    request$ : Observable<readonly (Riur | null)[] | null>
    cardOpened: boolean = false;
    selectedItem: Riur
    filterSideBarVisible: boolean = false;
    menuSidebarVisible: boolean = true;
    registrySection = ''

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _registryService : RegistryService,
        private _httpClient : HttpClient
    ) { 
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {
        
        this.activatedRoute.queryParams.subscribe(params => {  
            let query;
            params['regSection']==undefined ? (
                    this.registrySection=' '
                ):(
                    this.registrySection = params['regSection']=='' ? ' ': params['regSection'],
                    query =  params['regSection'] == 'real-estate' ? '': `?category=${params['regSection']}`
                ) 

            this._httpClient.get<Riur[]>(`http://localhost:3000/real-estate${query}`)
            .subscribe((riur: Riur[]) => {
                this.rowData = riur;
                console.log(this.rowData[0])
            });

            // Getting data on request in URL query params
            // this._registryService.searchData$
            //     .pipe(takeUntil(this._unsubscribeAll))
            //     .subscribe((riurs: Riur[]) => {
            //         this.rowData = this.filteredData = riurs;
            //         this._changeDetectorRef.markForCheck();
            //     });

            this.request$ = combineLatest([
                this.sorter$,
                this.direction$,
                this.page$,
                this.size$,
                tuiReplayedValueChangesFrom<number>(this.minAge)
            ]).pipe(
                debounceTime(0),
                switchMap(query => this.getData(...query).pipe(startWith(null))),
                share(),
            );

            this.loading$ = this.request$.pipe(map(value => !value));
        
            this.total$ = this.request$.pipe(
                filter(isPresent),
                map(({length}) => length),
                startWith(1),
            );

            this.data$ = this.request$.pipe(
                filter(isPresent),
                map(riurs => riurs.filter(isPresent)),
                startWith([])
            );
        });
        
    }

    /**
     * On destroy
     */
     ngOnDestroy(): void
     {
         // Unsubscribe from all subscriptions
         this._unsubscribeAll.next(undefined);
         this._unsubscribeAll.complete();
     }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Menu tree
     */
    readonly menu: TreeNode = {
        text: 'Registry',
        children: [
            {
                text: 'Недвижимое имущество',
                children: [
                    {text: 'Жилое', query:'dwelling'},
                    {text: 'Нежилое', query:'uninhabited'}
                ],
                query:'real-estate'
            },
            {
                text: 'Категория 1',
                children: [
                    {
                        text: 'Подкатегория',
                        children: [
                            {text: 'Подкатегория 1', query:''},
                            {text: 'Подкатегория 2', query:''},
                            {text: 'Подкатегория 3', query:''},
                        ],
                        query:'qwerty'
                    },
                ],
                query:'asd'
            },
            {text: 'Категория 2', query:''}    
            ,
            {
                text: 'Категория 3',
                children: [
                    {
                        text: 'Подкатегория',
                        children: [
                            {text: 'Подкатегория 1', query:''},
                            {text: 'Подкатегория 2', query:''},
                            {text: 'Подкатегория 3', query:''},
                        ],
                        query:''
                    },
                ],
                query:''
            }
        ],
        query:''
    };
    readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = 
        item => item.children || EMPTY_ARRAY;


    /**
     * Visible filter in sidebar
     */
    
    filterSidebarVisibleBtn() {
        this.filterSideBarVisible = !this.filterSideBarVisible;
    }

    /**
     * Visible menu in sidebar
     */
    menuSidebarVisibleBtn() {
        this.menuSidebarVisible = !this.menuSidebarVisible;
    }
    

    // Opening card of object, when clicking on open cell in table 
    toCard(object: Riur){
        this.cardOpened = !this.cardOpened;
        this.selectedItem = object;
        
    }

    // handling click on return button in card for hidden card component
    onReturnClick(){
        this.cardOpened = !this.cardOpened;
    }


    /**
     * Table
     */
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);
    
    readonly direction$ = new BehaviorSubject<-1 | 1>(1);
    readonly sorter$ = new BehaviorSubject<Key>('age');
    
    readonly minAge = new FormControl(25);

    
    setParamsInURL(query: string){
        this.router.navigate([], { queryParams: { regSection: query },relativeTo: this.activatedRoute });
        this.registrySection = query
    }

   
    initial: readonly string[] = ['Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Место рождения', 'Адрес', 'Возраст'];
    columns = ['actions', 'secondName', 'firstName', 'lastName', 'DOB', 'placeBirth', 'placeLive', 'age'];
    
    enabled = this.initial;
    
    search = ''
        
    readonly arrow = TUI_ARROW;

    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columns = this.initial
            .filter(column => enabled.includes(column))
            .map(column => KEYS[column]);
    }
    
    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }
    
    onSize(size: number): void {
        this.size$.next(size);
    }
    
    onPage(page: number): void {
        this.page$.next(page);
    }
    
    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }

    private getData(
        key: Key,
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<ReadonlyArray<Riur | null>> {
        const start = page * size;
        const end = start + size;
        const result = this.rowData
            .sort(sortBy(key, direction))
            .filter(riur => riur.age >= minAge)
            .map((riur, index) => (index >= start && index < end ? riur : null));

        return of(result);
        //return ftimer(200).pipe(mapTo(result));
    }
}

function sortBy(
    key: Key, 
    direction: -1 | 1
): TuiComparator<Riur> {
    return (a, b) =>
        key === 'age'
            ? direction * defaultSort(a.age, b.age)
            : direction * defaultSort(a[key], b[key]);
}