import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AutoLoginActions,
  logoutAction,
  ManualLoginActions,
  RegisterActions,
} from './auth.actions';
import { catchError, concatMap, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTypes } from '@/auth/index';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffect {
  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => this.router.navigate([''])),
      ),
    { dispatch: false },
  );

  public register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.start),
      concatMap(({ props }) =>
        this.authService.register({
          userData: props.user,
          companyData: props.company,
        }),
      ),
      map((user) => RegisterActions.success({ props: user })),
      catchError((err: HttpErrorResponse, caught) => {
        this.store.dispatch(RegisterActions.failed({ props: { err } }));
        return caught;
      }),
    ),
  );

  public manualLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ManualLoginActions.start),
        switchMap(({ props }) =>
          this.authService.login({
            email: props.email,
            password: props.password,
          }),
        ),
        map((user: AuthTypes.User) =>
          ManualLoginActions.success({ props: user }),
        ),
        catchError((err: HttpErrorResponse, caught) => {
          this.store.dispatch(ManualLoginActions.failed({ props: { err } }));
          return caught;
        }),
      ),
    { dispatch: false },
  );

  public autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AutoLoginActions.start),
        switchMap(() => this.authService.getLoggedUser()),
        map((user) => AutoLoginActions.success({ props: user })),
        catchError((err: HttpErrorResponse, caught) => {
          this.store.dispatch(AutoLoginActions.failed({ props: { err } }));
          return caught;
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {}
}
