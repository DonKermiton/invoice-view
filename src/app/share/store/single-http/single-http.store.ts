import { HttpErrorResponse } from '@angular/common/http';
import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
  props,
} from '@ngrx/store';

export interface DefaultHttpStructure<T, TError = HttpErrorResponse> {
  isPending: boolean;
  isLoaded: boolean;
  data: T;
  error: TError | null;
}

export const DefaultSelectors = <TData>(
  selector: MemoizedSelector<
    object,
    DefaultHttpStructure<TData, HttpErrorResponse>,
    DefaultProjectorFn<DefaultHttpStructure<TData, HttpErrorResponse>>
  >,
): {
  data: MemoizedSelector<object, TData>;
  isPending: MemoizedSelector<object, boolean>;
  error: MemoizedSelector<object, HttpErrorResponse | null>;
  isLoaded: MemoizedSelector<object, boolean>;
} => {
  return {
    isPending: createSelector(selector, (state) => state.isPending),
    isLoaded: createSelector(selector, (state) => state.isLoaded),
    data: createSelector(selector, (state) => state.data),
    error: createSelector(selector, (state) => state.error),
  };
};

export const CreateInitialState = <T extends object>(
  data: T,
): DefaultHttpStructure<T> => ({
  isPending: false,
  isLoaded: false,
  data,
  error: null,
});

export const DefaultHttpActions = <
  TStart = object,
  TSuccess = object,
  TFailed = HttpErrorResponse,
>() => ({
  start: props<{ props: TStart }>(),
  success: props<{ props: TSuccess }>(),
  failed: props<{ props: { err: TFailed } }>(),
});

export const DefaultHttpStart = <T>(
  currState: DefaultHttpStructure<T>,
): DefaultHttpStructure<T> => ({
  ...currState,
  isPending: true,
});

export const DefaultHttpSuccess = <T>(
  currState: DefaultHttpStructure<T>,
  data: T,
): DefaultHttpStructure<T> => ({
  ...currState,
  isPending: false,
  data,
  isLoaded: true,
});

export const DefaultHttpError = <T, TError = HttpErrorResponse>(
  currState: DefaultHttpStructure<T>,
  err: TError,
): DefaultHttpStructure<T, TError> => ({
  ...currState,
  isPending: false,
  isLoaded: false,
  error: err,
});
