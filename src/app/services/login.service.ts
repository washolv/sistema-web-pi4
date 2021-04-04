import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../modules/login/login/models/AuthenticatedUser';
import { User } from '../modules/login/login/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject!: BehaviorSubject<User>;
  jwtHelper: any;

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseAPIUrl;
  clienteId = environment.clientId;
  clienteSecret = environment.clientSecret;

  public login(email: string, senha: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': '1',
      }),

    };
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/login`, { username: email, password: senha }, { observe: 'response' as 'body' })
      .pipe(tap((resp: HttpResponse<any>) => {
        return resp;
      }));

  }

  logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
  public criarConta(user: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }
}
