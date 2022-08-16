import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {defaultSort, TuiComparator} from '@taiga-ui/addon-table';
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
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, timer} from 'rxjs';
import {
    debounceTime,
    filter,
    map,
    mapTo,
    share,
    startWith,
    switchMap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';


interface User {
  readonly _id: string;
  readonly index: number;
  readonly name: string;
  readonly registered: string;
}
type Key = '_id' | 'index' | 'name' |  'registered';

@Component({
  selector: 'registry-report',
  templateUrl: './registry-report.component.html',
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: `YMD`},
  ]
})
export class RegistryReportComponent implements OnInit {

  filterSideBarVisible: boolean = false;
  menuSidebarVisible: boolean = true;
  
  
  
  public DATA : User[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.http.get<User[]>(`http://localhost:3000/sampleWithData`).subscribe((users) => this.DATA = users );

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

  // Menu
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

  /**
   * Table
   */

   KEYS: Record<string, Key> = {
    'Ид': `_id`,
    'Индекс': `index`,
    'Имя': `name`,
    'Дата регистрации': `registered`,
  };

  private readonly size$ = new BehaviorSubject(10);
  private readonly page$ = new BehaviorSubject(0);

  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly sorter$ = new BehaviorSubject<Key>(`name`);

  readonly dataRange = new FormControl(
    new TuiDayRange(new TuiDay(2020, 2, 10), new TuiDay(2022, 3, 20)),
  );

  readonly request$ = combineLatest([
      this.sorter$,
      this.direction$,
      this.page$,
      this.size$,
      tuiReplayedValueChangesFrom<TuiDayRange>(this.dataRange),
  ]).pipe(
      // zero time debounce for a case when both key and direction change
      debounceTime(0),
      switchMap(query => this.getData(...query).pipe(startWith(null))),
      share(),
  );

  initial: readonly string[] = [`Ид`, `Индекс`, `Имя`, `Дата регистрации`];

  enabled = this.initial;

  columns = [`_id`, `index`, `name`, `registered`];

  search = ``;

  readonly arrow = TUI_ARROW;

  readonly loading$ = this.request$.pipe(map(value => !value));

  readonly total$ = this.request$.pipe(
      filter(isPresent),
      map(({length}) => length),
      startWith(1),
  );

  readonly data$: Observable<readonly User[]> = this.request$.pipe(
      filter(isPresent),
      map(users => users.filter(isPresent)),
      startWith([]),
  );

  onEnabled(enabled: readonly string[]): void {
      this.enabled = enabled;
      this.columns = this.initial
          .filter(column => enabled.includes(column))
          .map(column => this.KEYS[column]);
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

  getTableCellByKey(item: any, key:string):string {
    return item[key]
  }

  private getData(
      key:Key,
      direction: -1 | 1,
      page: number,
      size: number,
      dataRange: TuiDayRange,
  ): Observable<ReadonlyArray<User | null>> {
      const start = page * size;
      const end = start + size;
      const result = this.DATA
          .sort(sortBy(key, "", direction))
          .filter((user: User) => dateCompare(user.registered, dataRange) )
          .map((user: User, index: number) => (index >= start && index < end ? user : null));

      return timer(0).pipe(mapTo(result));
  }
}

function sortBy(key: Key, keyToSort:string, direction: -1 | 1): TuiComparator<User> {
    return (a, b) =>
        key === keyToSort
            ? direction * defaultSort(a, b)
            : direction * defaultSort(a[key], b[key]);
}

function getTuiDate(date : string) : TuiDay{
    let parseDate = date.trim().split('-')
    console.log(new TuiDay(Number(parseDate[0]), Number(parseDate[1]), Number(parseDate[2])), "    ", date)
    return new TuiDay(parseInt(parseDate[0]), parseInt(parseDate[1]), parseInt(parseDate[2]))
}

function dateCompare(day: string, dataRange: TuiDayRange): Boolean{
    let check = getTuiDate(day) >= dataRange.from && getTuiDate(day) <= dataRange.to
    if (check) {
      console.log(day, "  ", dataRange, "/  ", getTuiDate(day) >= dataRange.from && getTuiDate(day) <= dataRange.to)
    }
    
    return check
}