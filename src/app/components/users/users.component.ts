import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersStore } from '../../store/users';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns = ['id', 'login', 'type', 'score'];

  constructor(
    public usersStore: UsersStore,
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

  onSelect(value: string, routeQueryParams) {
    const selected = value;
    const { sort, order, page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm, selected } });
  }

  onSidenavClose(routeQueryParams) {
    const { sort, order, page, searchTerm } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page, searchTerm } });
  }

}
