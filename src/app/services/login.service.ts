import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'node:dns';
import { environment } from 'src/environments/environment';
import { User } from '../modules/login/login/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) { }
  apiUrl = environment.baseAPIUrl;

  public login(user: User){
    this.http.post<User>(`${this.apiUrl}/cliente/${user.email}`, user).subscribe(response =>{
      const result=response;
      console.log(response);
      if(result){
        window.localStorage.setItem('currentUser', JSON.stringify(result))
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
}
  public criarConta(user: any){
    return new Promise((resolve) =>{
        resolve(true);
    })
  }
}
