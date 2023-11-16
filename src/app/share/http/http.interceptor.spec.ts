import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthInterceptor, CUSTOM_URL } from './http.interceptor';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { HTTP_API_URL } from '@/core/http/set-http.utils';
import { BehaviorSubject } from 'rxjs';

describe('[HttpInterceptor] add path', () => {
  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptor;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthInterceptor,
        },
        {
          provide: HTTP_API_URL,
          useValue: new BehaviorSubject<string>('111.111.111/'),
        },
        {
          provide: CUSTOM_URL,
          useValue: new HttpContextToken<string>(() => 'test'),
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AuthInterceptor);
    http = TestBed.inject(HttpClient);
  });

  it('should create interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should send request', () => {
    http.get('test').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    httpMock.expectOne('111.111.111/test');
  });

  it('should send request and skip auto url', () => {
    const context = new HttpContext();

    context.set(CUSTOM_URL, 'newUrl');
    http
      .get('/test', {
        context,
      })
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    httpMock.expectOne('newUrl/test');
  });
});
