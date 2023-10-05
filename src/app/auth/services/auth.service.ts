import { Injectable, inject } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
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

  public login({email, password}: AuthTypes.Login): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', {
      email,
      password
    }, )
  }

  public test(): Observable<any> {
    return this.http.get('http://localhost:8080/api')
  }

}
