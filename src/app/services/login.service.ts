import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'node:dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  tokenUrl = this.apiUrl + environment.obterTokenUrl;

  public login(username: string, password: string): Observable<AuthenticatedUser> {
    const httpParams = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${this.clienteId}:${this.clienteSecret}`), 'Content-Type': 'application/x-www-form-urlencoded'
      }),
    };
    return this.http.post(this.tokenUrl, httpParams.toString(), httpOptions);
  }

  logout() {
    localStorage.removeItem('access_token');
  }
  public criarConta(user: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }
}
