import { Injectable } from '@angular/core';
import { IssuesService } from '../services/issues/issues.service';
import { IIssuesObject, IIssue, IParams, params } from '../models/issues';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { map, flatMap, pluck, filter, reduce } from 'rxjs/operators';

@Injectable()
export class IssuesStore {

  private _issuesObject: BehaviorSubject<any> = new BehaviorSubject({items: []});
  public readonly issuesObject: Observable<IIssuesObject> = this._issuesObject;
  issuesWithComments: Observable<any> = this._issuesObject.pipe(
    pluck('items')
  );
  config = { duration: 1500 };

  constructor(
    private issuesService: IssuesService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) {
    this.navigate();
    this.issuesWithComments$.subscribe(x => console.log('comments', x));
  }

  get issues$() {
    return this.issuesObject.pipe(map(res => res.items));
  }
  get issuesCount$() {
    return this.issuesObject.pipe(map(res => res.total_count));
  }
  get issuesWithComments$() {
    return this.issuesWithComments;
  }

  navigate() {
    this.uiStateStore.routeQueryParams$.subscribe(x => {
      this.loadIssues(
        {
          ...params,
          sort: x.get('sort') || params.sort,
          order: x.get('order') || params.order,
          page: x.get('page') || params.page,
          perPage: x.get('perPage') || params.perPage,
          searchTerm: x.get('searchTerm') || params.searchTerm
        }
      );
    });
  }

  loadIssues(userParams) {
    this.uiStateStore.startAction('Retrieving issues...');
    this.issuesService.getIssues(userParams)
      .subscribe(res => {
        this._issuesObject.next(res);
        this.uiStateStore.endAction('Issues retrieved');
      },
        err =>  {
          this.uiStateStore.endAction('Error retrieving issues');
          this.snackBar.open('No issues found', null, this.config);
        }
      );
  }

}
