import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Data, Router, NavigationEnd, Event } from '@angular/router';
import { initialUiState, IUiState } from '../models/ui-state';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';

@Injectable()
export class UiStateStore {

  private _uiState: BehaviorSubject<any> = new BehaviorSubject(initialUiState);
  public readonly uiState: Observable<IUiState> = this._uiState.asObservable();
  private _routeQueryParams: Observable<ParamMap>;
  private _route;

  constructor(private r: ActivatedRoute, private router: Router) {
    this._routeQueryParams = r.queryParamMap;
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => r),
      map(r => r.firstChild),
      filter(r => r.outlet === 'primary'),
      mergeMap(r => r.data)
    ).subscribe(x => this._route = x);
  }

  get routeQueryParams$() {
    return this._routeQueryParams;
  }
  get route$() {
    return this._route;
  }
  get uiState$() {
    return this._uiState;
  }

  startAction(message: string, isSelected: boolean) {
    this._uiState.next({
      actionOngoing: true,
      isSelected, 
      message
    });
  }

  endAction(message: string, isSelected: boolean) {
    this._uiState.next({
      actionOngoing: false,
      isSelected,
      message
    });
  }

}
