import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../modules/login/login/models/AuthenticatedUser';
import { User } from '../modules/login/login/models/User';
import { RoleGuardService } from './RoleGuard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject!: BehaviorSubject<User>;
  jwtHelper: any;

  constructor(private http: HttpClient, private roleGuardService: RoleGuardService) { }
  apiUrl = environment.baseAPIUrl;
  clienteId = environment.clientId;
  clienteSecret = environment.clientSecret;

  public login(email: string, senha: string) {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/login`, { username: email, password: senha }, { observe: 'response' as 'body' });
  }

  logout() {
    if(this.roleGuardService.getUserRole()){
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('frete');
      sessionStorage.removeItem('endereco-entrega');
      sessionStorage.removeItem('venda');
      window.location.reload();
    }
    localStorage.removeItem('access_token');

  }
  public criarConta(user: any) {
    return new Promise((resolve) => {
      resolve(true);
    })
  }
}
