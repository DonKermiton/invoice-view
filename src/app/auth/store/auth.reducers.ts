import { createReducer, on } from '@ngrx/store';
import {
  AutoLoginActions,
  ManualLoginActions,
  RegisterActions,
} from './auth.actions';
import {
  CreateInitialState,
  DefaultHttpError,
  DefaultHttpStart,
  DefaultHttpSuccess,
} from '../../share/types/store.types';

export const loggedUserReducers = createReducer(
  CreateInitialState({}),
  on(RegisterActions.start, (_state) => DefaultHttpStart(_state)),
  on(RegisterActions.success, (_state, { props }) =>
    DefaultHttpSuccess(_state, props),
  ),
  on(RegisterActions.failed, (_state, { props }) =>
    DefaultHttpError(_state, props.err),
  ),
  on(AutoLoginActions.start, (_state) => DefaultHttpStart(_state)),
  on(AutoLoginActions.success, (_state, { props }) =>
    DefaultHttpSuccess(_state, props),
  ),
  on(AutoLoginActions.failed, (_state, { props }) =>
    DefaultHttpError(_state, props.err),
  ),
  on(ManualLoginActions.start, (_state) => DefaultHttpStart(_state)),
  on(ManualLoginActions.success, (_state, { props }) =>
    DefaultHttpSuccess(_state, props),
  ),
  on(ManualLoginActions.failed, (_state, { props }) =>
    DefaultHttpError(_state, props.err),
  ),
);
