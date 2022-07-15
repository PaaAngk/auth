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
import {BehaviorSubject, combineLatest, from, Observable, of, takeUntil, timer} from 'rxjs';
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

interface Riur {
    readonly secondName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly DOB: string;
    readonly placeBirth: string;
    readonly placeLive: string;
    readonly age:number
}

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
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrySearchComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) { 
        this.activatedRoute.queryParams.subscribe(params => {
            this.getingData(
                params['regSection']==undefined ? (
                    ''
                ):(
                    params['regSection']=="real-estate" ? '': `?category=${params['regSection']}`
                )
            );
        });
    }

    ngOnInit() {

    }

    /**
     * Create menu tree
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
                        query:''
                    },
                ],
                query:''
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
     * Filter in sidebar visible
     */
    filterSideBar: boolean = false;
    filterSideBarBtn() {
        this.filterSideBar = !this.filterSideBar;
    }


    /**
     * Table
     */
    rowData: Riur[];

    loading$ :Observable<boolean>;
    
    total$: Observable<number>;
    
    data$: Observable<readonly Riur[]>;
 
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);
    
    readonly direction$ = new BehaviorSubject<-1 | 1>(1);
    readonly sorter$ = new BehaviorSubject<Key>('age');
    
    readonly minAge = new FormControl(25);

    setParamsInURLQuery(query: string){
        this.router.navigate([], { queryParams: { regSection: query },relativeTo: this.activatedRoute });
    }

    getingData(query:string){
        this.http.get<Riur[]>(`http://localhost:3000/real-estate${query}`)
        .subscribe((riur: Riur[]) => {
            this.rowData = riur;
        });

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
            startWith([]),
        );
        this._changeDetectorRef.markForCheck();
    }


    
    request$ = combineLatest([
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
    
    initial: readonly string[] = ['Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Место рождения', 'Адрес', 'Возраст'];
    columns = ['actions', 'secondName', 'firstName', 'lastName', 'DOB', 'placeBirth', 'placeLive', 'age'];
    
    enabled = this.initial;
    
    searchFormControl = new FormControl('');
    search = this.searchFormControl.value
        
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
        const result = [...this.rowData]
            .sort(sortBy(key, direction))
            .filter(riur => riur.age >= minAge)
            .map((riur, index) => (index >= start && index < end ? riur : null));

        return timer(200).pipe(mapTo(result));
        //return from(result).pipe(mapTo([]));
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
    

