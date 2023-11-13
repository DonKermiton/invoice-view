import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthTypes } from '..';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient;

  constructor() {
    this.http = inject(HttpClient);
  }

  public login({ email, password }: AuthTypes.Login): Observable<any> {
    return this.http.post('/login', {
      email,
      password,
    });
  }

  public register({ userData, companyData }: any): Observable<any> {
    return this.http.post('/register', {
      ...userData,
      ...companyData,
    });
  }

  public test(): Observable<any> {
    return this.http.get('http://localhost:8080/api');
  }

  public getLoggedUser(): Observable<any> {
    return this.http.get('/user');
  }
}
