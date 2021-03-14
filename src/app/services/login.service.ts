import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'node:dns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private httpClient: HttpClient) { }
  apiUrl = environment.baseAPIUrl;

  public autenticacao(user: any){
    return new Promise((resolve) =>{
        window.localStorage.setItem('token', 'meu-token');
        resolve(true);
    })
  }
  public criarConta(user: any){
    return new Promise((resolve) =>{
        resolve(true);
    })
  }
}
