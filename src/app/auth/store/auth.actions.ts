import { createAction, createActionGroup, props } from '@ngrx/store';
import * as AuthTypes from './../auth.types';

export const authActions = createActionGroup({
  source: '[Login Page] Auth Api',
  events: {
    login: props<AuthTypes.AuthState>(),
    register: props<AuthTypes.Register>(),
  },
});

export const logoutAction = createAction('[Login Page] logout');
