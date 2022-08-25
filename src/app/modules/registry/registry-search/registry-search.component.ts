import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import {EMPTY_ARRAY, TuiHandler} from '@taiga-ui/cdk';
import { TableColumn, TreeNode } from '@core/models' 
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
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    readonly tableColumns: TableColumn[] = [
        {
            name: 'Фамилия',
            dataKey: 'secondName'
        },
        {
            name: 'Имя',
            dataKey: 'firstName'
        },
        {
            name: 'Отчество',
            dataKey: 'lastName'
        },
        {
            name: 'Дата рождения',
            dataKey: 'DOB'
        },
        {
            name: 'Место рождения',
            dataKey: 'placeBirth'
        },
        {
            name: 'Адрес',
            dataKey: 'placeLive'
        },
        {
            name: 'Возраст',
            dataKey: 'age'
        }
    ]

    riurs: Riur[];
    filteredRiurs: BehaviorSubject<Riur[]> = new BehaviorSubject<Riur[]>([] as Riur[]);
    search = '';

    readonly filterForm = new FormGroup({
        age : new FormControl(null)
    });

    // Detail card 
    cardOpened: boolean = false;
    selectedItem: Riur

    // Menu
    filterSideBarVisible: boolean = false;
    menuSidebarVisible: boolean = true;
    registrySection = ''

    // Inject column editor button in parent template
    columnEditorTemplate:any;
    setColumnEditorTemplate(templateRef: TemplateRef<any>) {
        this.columnEditorTemplate = templateRef;
        this._changeDetectorRef.markForCheck();
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _registryService : RegistryService,
    ) { 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit() {       
        this.activatedRoute.queryParams.subscribe(params => {  
            let query = '';
            params['regSection']==undefined ? (
                    this.registrySection=' '
                ):(
                    this.registrySection = params['regSection']=='' ? ' ': params['regSection'],
                    query =  params['regSection'] == 'real-estate' ? '': `?category=${params['regSection']}`
                )

            // Getting data on request in URL query params
            this._registryService.getSearchData(query)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((riurs: Riur[]) => {
                this.riurs = riurs;
                this.filterRiur(null);
                this._changeDetectorRef.markForCheck();
            });
        });

        this.filterForm.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(value => {
            this.filterRiur(value),
            this._changeDetectorRef.markForCheck()
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
     * Filter the users
     * @param query any
     */
     filterRiur(query: any): void
     {
         // Reset the filter
         if ( !query )
         {
             this.filteredRiurs.next(this.riurs);
             return;
         }
         
         this.filteredRiurs.next(this.riurs.filter(riur => riur.age >= query.age));
     }
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
            }
        ],
        query:''
    };
    readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = 
        item => item.children || EMPTY_ARRAY;


    /**
     * Opening card of object, when clicking on open cell in table 
     * @param object - Riur
     */
    toCard(object: Riur){
        this.cardOpened = !this.cardOpened;
        this.selectedItem = object;
        
    }

    /**
     * handling click on return button in card for hidden card component 
     */
    onReturnClick(){
        this.cardOpened = !this.cardOpened;
    }
    
    /**
     * Setting parametr "regSection" in url 
     * @param query - string
     */
    setParamsInURL(query: string){
        this.router.navigate([], { queryParams: { regSection: query },relativeTo: this.activatedRoute });
        this.registrySection = query
    }

}

