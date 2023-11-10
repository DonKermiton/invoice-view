import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AutoLoginActions,
  logoutAction,
  ManualLoginActions,
  RegisterActions,
} from './auth.actions';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthTypes } from '@/auth/index';

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
      switchMap(({ props }) =>
        this.authService.register({
          userData: props.user,
          companyData: props.company,
        }),
      ),
      tap(console.log),
      map((user) => RegisterActions.success({ props: user })),
      catchError((err: HttpErrorResponse) => {
        console.log('err', err);
        RegisterActions.failed({ props: { err } });
        return EMPTY;
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
        catchError((err: HttpErrorResponse) => {
          ManualLoginActions.failed({ props: { err } });
          return EMPTY;
        }),
        tap((user: AuthTypes.User) =>
          ManualLoginActions.success({ props: user }),
        ),
      ),
    { dispatch: false },
  );

  public autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AutoLoginActions.start),
        switchMap(() => this.authService.getLoggedUser()),
        map((user) => AutoLoginActions.success({ props: user })),
        catchError((err) => {
          AutoLoginActions.failed({ props: { err } });
          return EMPTY;
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
