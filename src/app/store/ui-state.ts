import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { initialUiState, IUiState } from '../models/ui-state';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UiStateStore {

  private _uiState: BehaviorSubject<any> = new BehaviorSubject(initialUiState);
  public readonly uiState: Observable<IUiState> = this._uiState.asObservable();
  private _routeQueryParams: Observable<ParamMap>;

  constructor(private r: ActivatedRoute, private router: Router) {
    this._routeQueryParams = r.queryParamMap;
  }

  get routeQueryParams$() {
    return this._routeQueryParams;
  }
  get uiState$() {
    return this._uiState;
  }

  startAction(message: string) {
    this._uiState.next({
      actionOngoing: true,
      message
    });
  }

  endAction(message: string) {
    this._uiState.next({
      actionOngoing: false,
      message
    });
  }

}
