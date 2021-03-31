import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenDecoded } from './modules/login/login/models/TokenDecoded';
import { RoleGuardService } from './services/RoleGuard.service';

@Injectable({
  providedIn: 'root'
})
export class EstoquistaGuard implements CanActivate {
  constructor(private roleGuardService:RoleGuardService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = <TokenDecoded> this.roleGuardService.decodeJWT();
      if (user != null) {
        if (user.authorities![0] === "ROLE_ESTOQUISTA") {
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
