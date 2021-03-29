import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;


    // decode the token to get its payload
    const token = this.decodeJWT();

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }else if(token.role !== expectedRole ){
      this.router.navigate(['']);
      return true;
    }
    return true;
  }

  public getToken(): string {
    return localStorage.getItem('access_token')!;
  }

  public decodeJWT(): any {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }
}
