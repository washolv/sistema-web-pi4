import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TokenDecoded } from '../modules/login/login/models/TokenDecoded';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  tokenDecoded: TokenDecoded=new TokenDecoded();
  constructor(public router: Router) { }

  public getToken(): string {
    return localStorage.getItem('access_token')!;
  }
  public decodeJWT(): any {
    try {
      return this.tokenDecoded= jwt_decode(this.getToken());

    } catch (Error) {
      return null;
    }
  }

  public getUser():TokenDecoded {
    let userRole = new TokenDecoded;
    const user = <TokenDecoded>this.decodeJWT();
    if (user) {
      userRole = user;
    }
    return userRole;
  }

  public getUserRole(){
    let userRole;
    const user = <TokenDecoded>this.decodeJWT();
    if(user){
      userRole = user.aud;
    }else{
      return userRole="";
    }
    return userRole;
  }
}
