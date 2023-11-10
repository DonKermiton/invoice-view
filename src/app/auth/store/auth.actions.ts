import { createAction, createActionGroup } from '@ngrx/store';
import * as AuthTypes from './../auth.types';
import { StoreTypes } from '@/share/types';

export const ManualLoginActions = createActionGroup({
  source: '[Login Page] Login Page',
  events: StoreTypes.DefaultHttpActions<AuthTypes.Login, AuthTypes.User>(),
});

export const AutoLoginActions = createActionGroup({
  source: '[APP_INIT] Login INIT',
  events: StoreTypes.DefaultHttpActions<object, AuthTypes.User>(),
});

export const RegisterActions = createActionGroup({
  source: '[Register Page] Register Page',
  events: StoreTypes.DefaultHttpActions<AuthTypes.Register, AuthTypes.User>(),
});

export const LogoutActions = createActionGroup({
  source: '[Logout] Logout user',
  events: StoreTypes.DefaultHttpActions(),
});

export const logoutAction = createAction('[Login Page] logout');
