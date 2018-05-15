import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesStore } from '../../store/issues';
import { UiStateStore } from '../../store/ui-state';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {

  displayedColumns = ['number', 'user', 'title', 'created', 'comments'];

  constructor(
    public issuesStore: IssuesStore,
    public uiStateStore: UiStateStore,
    private router: Router
  ) {}

  onPageChange(event, routeQueryParams) {
    const page = event.pageIndex + 1;
    const { sort, order } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page } });
  }

  onSortData(event, routeQueryParams) {
    const { active: sort, direction: order } = event;
    const { page } = routeQueryParams;
    return this.router.navigate(['/users'], { queryParams: { sort, order, page } });
  }

}
