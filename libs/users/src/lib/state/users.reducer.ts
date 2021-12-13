/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

// Interface For The UserState
export interface UsersState {
  user: User | null,
  isAuthenticated: boolean
}

// export interface UsersPartialState {
//   [USERS_FEATURE_KEY]: UsersState;
// }

// To Create The intitial Users State
export const intitialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
}

// To Create The Reducer
const usersReducer = createReducer(intitialUsersState,
  on(UsersActions.buildUserSession, (state) => ({...state})), //<--No Change
  // In Case Of Success Action
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  // In Case Of Failed Action
  on(UsersActions.buildUserSessionFailed, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))
  );


export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
