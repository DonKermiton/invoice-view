import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { inject, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoLoginActions } from '../../auth/store/auth.actions';
import { RequestTypes } from '@/share/types';
import { User } from '../../auth/auth.types';

export const HTTP_API_URL: InjectionToken<BehaviorSubject<string>> =
  new InjectionToken('HTTP_API_URL', {
    providedIn: 'root',
    factory: () => new BehaviorSubject<string>(''),
  });

export function getHttpURL(
  http: HttpClient,
  store: Store,
): () => Observable<User> {
  const http_url = inject(HTTP_API_URL);
  return () => {
    return http.get<Record<string, string>>('assets/config/config.json').pipe(
      tap((config: Record<string, string>) => {
        const apiUrl = config['api_url'];

        if (!apiUrl) {
          console.error('[on app init] field api_url does not exists');
        }

        http_url.next(apiUrl);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('[on app init] config file does not exists', err);
        return EMPTY;
      }),
      switchMap(() => {
        return http
          .get<RequestTypes.HttpRequest<User>>(`/user`)
          .pipe(map((user) => user.data));
      }),
      tap((user: User) =>
        store.dispatch(AutoLoginActions.success({ props: user })),
      ),
      catchError(() => {
        return EMPTY;
      }),
    );
  };
}
