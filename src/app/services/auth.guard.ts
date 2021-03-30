import { HostListener, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenDecoded } from '../modules/login/login/models/TokenDecoded';
import { LoginService } from './login.service';
import { RoleGuardService } from './RoleGuard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private roleGuardService: RoleGuardService, private loginService: LoginService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = <TokenDecoded>this.roleGuardService.decodeJWT();
    if (route.data.expectedRole.length) {
      if (user != null) {
        for (let i = 0; i < route.data.expectedRole.length; i++) {
          if (user.authorities![0] === route.data.expectedRole[i]) {
            return true;
          }
        }
        this.router.navigate(['']);
        return false;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
    if (user != null) {
      if (user.authorities![0] === route.data.expectedRole) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
