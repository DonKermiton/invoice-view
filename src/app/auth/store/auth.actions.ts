import { createAction, createActionGroup } from '@ngrx/store';
import * as AuthTypes from './../auth.types';
import { SingleHttpStore } from '@/store/single-http';
export const ManualLoginActions = createActionGroup({
  source: '[Login Page] Login Page',
  events: SingleHttpStore.DefaultHttpActions<AuthTypes.Login, AuthTypes.User>(),
});

export const AutoLoginActions = createActionGroup({
  source: '[APP_INIT] Login INIT',
  events: SingleHttpStore.DefaultHttpActions<object, AuthTypes.User>(),
});

export const RegisterActions = createActionGroup({
  source: '[Register Page] Register Page',
  events: SingleHttpStore.DefaultHttpActions<
    AuthTypes.Register,
    AuthTypes.User
  >(),
});

export const LogoutActions = createActionGroup({
  source: '[Logout] Logout user',
  events: SingleHttpStore.DefaultHttpActions(),
});

export const logoutAction = createAction('[Login Page] logout');
