import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteInfo } from '@core/models/sidebar.metadata';

@Component({
  selector: 'app-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.less']
})
export class VerticalNavComponent implements OnInit {
  @Input() ROUTES !: RouteInfo[];
  @Input() mainRoute : String = '';
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // End open close
  ngOnInit() {
    //this.sidebarnavItems = this.ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.sidebarnavItems = this.ROUTES;
  }

}
