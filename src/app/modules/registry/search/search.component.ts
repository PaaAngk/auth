import { Component, OnInit } from '@angular/core';
import {EMPTY_ARRAY, TuiHandler} from '@taiga-ui/cdk';
import { TreeNode } from '@core/models' 
import {FormControl, FormGroup} from '@angular/forms';
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
    readonly name: string;
    readonly dob: TuiDay;
}
 
const TODAY = TuiDay.currentLocal();
const FIRST = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Joan',
    'Jim',
    'Julia',
    'Joe',
    'Julia',
];
 
const LAST = [
    'Smith',
    'West',
    'Brown',
    'Jones',
    'Davis',
    'Miller',
    'Johnson',
    'Jackson',
    'Williams',
    'Wilson',
];
 
type Key = 'name' | 'dob' | 'age';
 
const DATA: readonly User[] = Array.from({length: 300}, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${
        FIRST[Math.floor(Math.random() * 10)]
    }`,
    dob: TODAY.append({day: -Math.floor(Math.random() * 4000) - 7500}),
}));
const KEYS: Record<string, Key> = {
    Name: 'name',
    Age: 'age',
    'Date of Birth': 'dob',
};

@Component({
  selector: 'registry-search',
  templateUrl: './search.component.html'
})
export class RegistrySearchComponent implements OnInit {

    readonly menu: TreeNode = {
        text: 'Registry',
        children: [
            {
                text: 'Недвижимое имущество',
                children: [
                {text: 'Жилое', category:'real-estate_dwelling'}, 
                {text: 'Нежилое', category:'real-estate_uninhabited '}
                ],
                category:'real-estate'
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {text: 'Top level 2', category:''}    
            ,
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            }
            ,
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            },
            {
                text: 'Top level 1',
                children: [
                    {
                        text: 'Another item',
                        children: [
                            {text: 'Next level 1', category:''},
                            {text: 'Next level 2', category:''},
                            {text: 'Next level 3', category:''},
                        ],
                        category:''
                    },
                ],
                category:''
            }    
        ],
        category:''
    };

    constructor() { }

    ngOnInit() {
    }

    readonly handler: TuiHandler<TreeNode, readonly TreeNode[]> = item => item.children || EMPTY_ARRAY;

    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);
    
    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('name');
    
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
    
    initial: readonly string[] = ['Name', 'Date of Birth', 'Age'];
    
    enabled = this.initial;
    
    columns = ['name', 'dob', 'age'];
    
    readonly searchForm = new FormGroup({
        testValue: new FormControl('mail@mail.ru'),
    });
    search = '';
    
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
    
    getAge(user: User): number {
        return getAge(user);
    }
     
    private getData(
        key: 'name' | 'dob' | 'age',
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<ReadonlyArray<User | null>> {
        console.info('Making a request');
    
        const start = page * size;
        const end = start + size;
        const result = [...DATA]
            .sort(sortBy(key, direction))
            .filter(user => getAge(user) >= minAge)
            .map((user, index) => (index >= start && index < end ? user : null));
    
        // Imitating server response
        return timer(3000).pipe(mapTo(result));
    }
}
    
function sortBy(key: 'name' | 'dob' | 'age', direction: -1 | 1): TuiComparator<User> {
    return (a, b) =>
        key === 'age'
            ? direction * defaultSort(getAge(a), getAge(b))
            : direction * defaultSort(a[key], b[key]);
}
    
function getAge({dob}: User): number {
    const years = TODAY.year - dob.year;
    const months = TODAY.month - dob.month;
    const days = TODAY.day - dob.day;
    const offset = toInt(months > 0 || (!months && days > 9));
    
    return years + offset;
}

