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

// export interface DefaultHttpFields<
//   TData extends object,
//   TError = HttpErrorResponse,
// > {
//   isLoading: boolean;
//   isLoaded: boolean;
//   error: TError | null;
//   data: TData;
// }
//
// export class HttpSingleEntity<
//   TData extends object,
//   TStart,
//   TSuccess,
//   TError = HttpErrorResponse,
// > {
//   public selectors: MemoizedSelector<object, TData> | null = null;
//   public reducers: ActionReducer<TData, Action> | null = null;
//   public actions: any;
//
//   constructor(
//     public featureName: string,
//     public additionalReducer: Array<ActionReducer<TData, Action> | object> = [],
//     public config: { initialState: TData; actionSourceName: string },
//   ) {}
//
//   public create(): any {}
//
//   private createSelectors(): MemoizedSelector<object, TData> {
//     const selector = createFeatureSelector<TData>(this.featureName);
//     this.selectors = selector;
//
//     return selector;
//   }
//
//   private createActions(type: string): void {
//     this.actions = createActionGroup({
//       source: type,
//       events: DefaultHttpActions<TStart, TSuccess>(),
//     });
//   }
//
//   private createReducers(): ActionReducer<TData, Action> {
//     if (this.additionalReducer) {
//     }
//
//     const reducers = createReducer(this.config.initialState);
//     this.reducers = reducers;
//
//     return reducers;
//   }
// }
