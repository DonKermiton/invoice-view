import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP_API_URL } from '@/core/http/set-http.utils';

export const CUSTOM_URL: HttpContextToken<string> = new HttpContextToken(
  () => '',
);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Optional()
    @Inject(HTTP_API_URL)
    private httpAPIURL: BehaviorSubject<string>,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const skipAutoUrl: string = req.context.get(CUSTOM_URL);
    let url = req.url;

    if (this.httpAPIURL.getValue() && !skipAutoUrl) {
      url = this.httpAPIURL.getValue() + req.url;
    }

    const reqClone = req.clone({
      withCredentials: true,
      url,
    });

    return next.handle(reqClone);
  }
}
