import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logoutAction } from './auth.actions';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}
}
