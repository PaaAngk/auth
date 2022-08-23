import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import {
    isPresent,
    toInt,
    TUI_DEFAULT_MATCHER,
    TuiDay,
    tuiReplayedValueChangesFrom,
    TUI_DATE_FORMAT, 
    TUI_DATE_SEPARATOR, 
    TuiDayRange
} from '@taiga-ui/cdk';
import {  BehaviorSubject, Observable, pipe, Subject } from 'rxjs';
import { takeUntil, filter, map} from 'rxjs/operators';
import { TableColumn } from '@core/models'
import { FormControl } from '@angular/forms';
import { RegistryService } from 'src/app/modules/registry/registry.service';
import { User } from '../registry.types';
import { defaultDayRangePeriods } from 'src/app/shared/utils/default-day-range-periods';
import { TuiDayRangePeriod } from '@taiga-ui/kit';
import { SortableTableWithPaginationComponent } from 'src/app/shared/components/sortable-table-with-pagination/sortable-table-with-pagination.component';

@Component({
  selector: 'registry-report',
  templateUrl: './registry-report.component.html',
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: `YMD`},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryReportComponent implements OnInit {

    readonly tableColumns: TableColumn[] = [
        {
            name: 'Ид',
            dataKey: '_id'
        },
        {
            name: 'Индекс',
            dataKey: 'index'
        },
        {
            name: 'Имя',
            dataKey: 'name'
        },
        {
            name: 'Дата регистрации',
            dataKey: 'registered'
        }
    ]

    readonly itemsCalendarVariants: readonly TuiDayRangePeriod[] = [
        defaultDayRangePeriods()
    ][0];
    

    filterSideBarVisible: boolean = false;
    menuSidebarVisible: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    search = '';

    dataRange = new FormControl(
        new TuiDayRange(new TuiDay(2020, 2, 10), TuiDay.currentLocal())
    );
    
    // Inject column editor button in template
    columnEditorTemplate:any;
    setColumnEditorTemplate(templateRef: TemplateRef<any>) {
        this.columnEditorTemplate = templateRef;
        this._changeDetectorRef.markForCheck();
    }

    users : User[];
    filteredUsers : BehaviorSubject<User[]> = new BehaviorSubject<User[]>(undefined as unknown as User[]);
    
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _registryService: RegistryService
    ) { }

    ngOnInit() {
        //Getting data on request in URL query params
        // this.users = this._registryService.userData$
        //     .pipe(takeUntil(this._unsubscribeAll))
        
        
            
        this._registryService.userData$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users : User[]) => {
                this.users = users;
                //this.filteredUsers.next(users)
                this._changeDetectorRef.markForCheck();
            });

        this.filterChats(null);


        this.dataRange.valueChanges.subscribe(value => {
            this.filterChats(value);
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(undefined);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    //@ViewChild(SortableTableWithPaginationComponent) child:SortableTableWithPaginationComponent;


    /**
     * Filter the chats
     * @param queryDate TuiDayRange | null
     */
    filterChats(queryDate: TuiDayRange | null): void
    {
        // Reset the filter
        if ( !queryDate )
        {
            console.log("null")
            this.filteredUsers.next(this.users);
            return;
        }
        //this.filteredUsers = this.users.filter(user => user.index > 20);
        this.filteredUsers.next(this.users.filter(user => dateCompare(user.registered, queryDate)));
        //this.users.pipe( map((users:User[]) => users.filter(user => user.index > 20)))
        //this.child.detectorRef();
    }

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

    /**
     * Menu items list
     */
    menuItem = [
        {
            item:"Реестр на дату"
        },
        {
            item:"Отчет 1"
        },
        {
            item:"Отчет 2"
        },
        {
            item:"Отчет 3"
        },
        {
            item:"Отчет 4"
        },
        {
            item:"Отчет 5"
        }
    ]
    currentMenuItem = "Реестр на дату"
    setCurrentMenuItem(item : string){
        this.currentMenuItem = item
    }

    log(){
        console.log('click')
    }
  
}

/**
* Getting data from string
*
* @param date string
*/
function getTuiDate(date : string) : TuiDay{
    let parseDate = date.trim().split('-')
    //console.log(new TuiDay(Number(parseDate[0]), Number(parseDate[1]), Number(parseDate[2])), "    ", date)
    return new TuiDay(parseInt(parseDate[0]), parseInt(parseDate[1]), parseInt(parseDate[2]))
}

/**
* Comparing date - string and date - TuiDayRange
* 
* @param day string
* @param dataRange TuiDayRange | null
*/
function dateCompare(day: string, dataRange: TuiDayRange | null): Boolean{
    let check = getTuiDate(day) >= dataRange!.from && getTuiDate(day) <= dataRange!.to
    // if (check) {
    //   console.log(day, "  ", dataRange, "/  ", getTuiDate(day) >= dataRange!.from && getTuiDate(day) <= dataRange!.to)
    // }
    
    return check
}