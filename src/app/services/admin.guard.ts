import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenDecoded } from '../modules/login/login/models/TokenDecoded';
import { RoleGuardService } from './RoleGuard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private roleGuardService:RoleGuardService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const user = <TokenDecoded> this.roleGuardService.decodeJWT();
      if (user != null) {
        if (user.aud === "ROLE_ADMIN") {
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
