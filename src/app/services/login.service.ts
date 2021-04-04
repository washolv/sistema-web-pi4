import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  public login(username: string, password: string) {
    let usuario = { username: username, password: password }
    let r= this.http.post<HttpResponse<any>>(`${this.apiUrl}/login`, usuario);
    console.log(r)
    return r;

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
