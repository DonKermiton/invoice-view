import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { inject, InjectionToken } from '@angular/core';

export const HTTP_API_URL: InjectionToken<BehaviorSubject<string>> =
  new InjectionToken('HTTP_API_URL', {
    providedIn: 'root',
    factory: () => new BehaviorSubject<string>(''),
  });

export function getHttpURL(http: HttpClient): () => Observable<any> {
  const http_url = inject(HTTP_API_URL);
  return () =>
    http.get<Record<string, string>>('assets/config/config.json').pipe(
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
    );
}
