import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesStore } from '../../store/issues';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns = ['number', 'user', 'title', 'created', 'comments'];

  constructor(
    public issuesStore: IssuesStore,
    public uiStateStore: UiStateStore,
    private router: Router
  ) {}

  onPageChange(event, routeQueryParams) {
    const page = event.pageIndex + 1;
    const { sort, order, searchTerm } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSortData(event, routeQueryParams) {
    const { active: sort, direction: order } = event;
    const { page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

  onSearchChange(value: string, routeQueryParams) {
    const searchTerm = value;
    const { sort, order, page } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

}
