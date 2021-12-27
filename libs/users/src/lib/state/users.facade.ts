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

  // To Call An Action and it will be Called in the usersService
  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}

// ^^
// ^^
// ||
// ||
// Using Facade File to make some Functions to Organize the Code
