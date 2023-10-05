import { createReducer, on } from '@ngrx/store';
import * as Auth from './index';

export const loggedUserReducers = createReducer(
  {},
  on(Auth.AuthActions.authActions.login, (_state, userAction) => ({
    user: userAction
  })),
  on(Auth.AuthActions.logoutAction, () => ({
    user: null
  }))
);
