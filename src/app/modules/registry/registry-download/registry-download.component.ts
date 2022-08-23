import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';


interface User {
  readonly _id: string;
  readonly index: number;
  readonly name: string;
  readonly registered: string;
}

interface TableColumn {
  name: string;
  dataKey: string;
  isSortable?: boolean;
}

@Component({
  selector: 'registry-download',
  templateUrl: './registry-download.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryDownloadComponent implements OnInit {

    tableColumns: TableColumn[] = [
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

    search = '';


    menuSidebarVisible: boolean = true;
    
    DATA$ : Observable<User[]>;

    columnEditorTemplate:any;
    setColumnEditorTemplate(templateRef: TemplateRef<any>) {
      this.columnEditorTemplate = templateRef;
      this._changeDetectorRef.markForCheck();
    }

    constructor(
        private http: HttpClient,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.DATA$ = this.http.get<User[]>(`http://localhost:3000/sampleWithData`)
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
          item:"Перечень объектов"
        },
        {
          item:"Реквизиты"
        }
    ]
    currentMenuItem = "Перечень объектов"
    setCurrentMenuItem(item : string){
        this.currentMenuItem = item
    }
  



  

}

    // readonly arrow = TUI_ARROW;
    // columnNames : readonly string[] = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    // enabled : readonly string[] = this.columnNames;
    
    // @ViewChild(SortableTableWithPaginationComponent) child:SortableTableWithPaginationComponent;
    // callChild($event:readonly string[]){
    //   this._changeDetectorRef.markForCheck();
    //   this.child.onEnabled($event);
    // }
