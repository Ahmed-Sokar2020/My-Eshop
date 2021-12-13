import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';


@Injectable()
export class UsersFacade {

  // To Call Aselector
  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getIsAuthenticated));

  constructor(private store: Store) {}

  // To Call An Action
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
