import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {FormControl} from '@angular/forms';
import {defaultSort, TuiComparator} from '@taiga-ui/addon-table';
import {
    isPresent,
    toInt,
    TUI_DEFAULT_MATCHER,
    TuiDay,
    tuiReplayedValueChangesFrom,
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
 
interface User {
  readonly _id: string;
  readonly index: number;
  readonly name: string;
  readonly registered: Date;
}


interface TableColumn {
  name: string;
  dataKey: string;
  isSortable?: boolean;
}

type Key = '_id' | 'index' | 'name' |  'registered';
 
@Component({
  selector: 'app-sortable-table-with-pagination',
  templateUrl: './sortable-table-with-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortableTableWithPaginationComponent<TType> implements OnInit {

  @Input('type') Key : TType
  @Input('DATA') DATA : any

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  constructor() { } 

  ngOnInit(): void {
  }

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

  readonly minAge = new FormControl(21);

  readonly request$ = combineLatest([
      this.sorter$,
      this.direction$,
      this.page$,
      this.size$,
      tuiReplayedValueChangesFrom<number>(this.minAge),
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
      minAge: number,
  ): Observable<ReadonlyArray<User | null>> {
      const start = page * size;
      const end = start + size;
      const result = this.DATA
          .sort(sortBy(key, "", direction))
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
 