import { createReducer, on } from '@ngrx/store';
import {
  AutoLoginActions,
  ManualLoginActions,
  RegisterActions,
} from './auth.actions';
import { SingleHttpStore } from '@/store/single-http';

export const loggedUserReducers = createReducer(
  SingleHttpStore.CreateInitialState({}),
  on(RegisterActions.start, (_state) =>
    SingleHttpStore.DefaultHttpStart(_state),
  ),
  on(RegisterActions.success, (_state, { props }) =>
    SingleHttpStore.DefaultHttpSuccess(_state, props),
  ),
  on(RegisterActions.failed, (_state, { props }) =>
    SingleHttpStore.DefaultHttpError(_state, props.err),
  ),
  on(AutoLoginActions.start, (_state) =>
    SingleHttpStore.DefaultHttpStart(_state),
  ),
  on(AutoLoginActions.success, (_state, { props }) =>
    SingleHttpStore.DefaultHttpSuccess(_state, props),
  ),
  on(AutoLoginActions.failed, (_state, { props }) =>
    SingleHttpStore.DefaultHttpError(_state, props.err),
  ),
  on(ManualLoginActions.start, (_state) =>
    SingleHttpStore.DefaultHttpStart(_state),
  ),
  on(ManualLoginActions.success, (_state, { props }) =>
    SingleHttpStore.DefaultHttpSuccess(_state, props),
  ),
  on(ManualLoginActions.failed, (_state, { props }) =>
    SingleHttpStore.DefaultHttpError(_state, props.err),
  ),
);
