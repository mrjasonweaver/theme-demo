import { Injectable } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { IUsersObject, IUser, IParams, params } from '../models/users';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UiStateStore } from './ui-state';
import { MatSnackBar } from '@angular/material';
import { map, debounceTime } from 'rxjs/operators';

interface CacheContent {
  expiry: number;
  value: any;
}

@Injectable()
export class UsersStore {

  private _usersObject: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly usersObject: Observable<IUsersObject> = this._usersObject;
  private cache: Map<string, CacheContent> = new Map<string, CacheContent>();
  private _userSelected: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly userSelected: Observable<IUser> = this._userSelected;
  readonly DEFAULT_MAX_AGE: number = 300000;
  config = { duration: 1500 };

  constructor(
    private usersService: UsersService,
    public uiStateStore: UiStateStore,
    public snackBar: MatSnackBar
  ) {
    this.navigate();
  }

  get users$() {
    return this.usersObject.pipe(map(res => res.items));
  }
  get usersCount$() {
    return this.usersObject.pipe(map(res => res.total_count));
  }
  get userSelected$() {
    return this.userSelected;
  }

  navigate() {
    this.uiStateStore.routeQueryParams$.subscribe(x => {
      const queryParams = {
        ...params,
        sort: x.get('sort') || params.sort,
        order: x.get('order') || params.order,
        page: x.get('page') || params.page,
        perPage: x.get('perPage') || params.perPage,
        searchTerm: x.get('searchTerm') || params.searchTerm
      };
      const selected = x.get('selected') || params.selected;
      return this.loadUsers(queryParams, selected);
    });
  }

  loadUsers(userParams, selected) {
    const isSelected = selected !== '';
    const p = userParams;
    const key = Object.keys(p).map(x => p[x]).reduce((a, x) => a += x, '');
    const expiry = Date.now() + this.DEFAULT_MAX_AGE;
    this.uiStateStore.startAction('Retrieving Users...', isSelected);
    if (this.cache.has(key)) {
      this._usersObject.next(this.cache.get(key).value);
      this._userSelected.next(this.cache.get(key).value.items.filter(x => x.id === +selected)[0]);
      this.uiStateStore.endAction('Users retrieved', isSelected);
    } else {
      this.usersService.getUsers(userParams).subscribe(res => {
        const value = res;
        this.cache.set(key, { value, expiry });
        this._usersObject.next(res);
        this._userSelected.next(res.items.filter(x => x.id === +selected)[0]);
        this.uiStateStore.endAction('Users retrieved', isSelected);
      },
        err =>  {
          this.uiStateStore.endAction('Error retrieving Users', isSelected);
          this.snackBar.open('No Users found', null, this.config);
        }
      );
    }
  }

}
