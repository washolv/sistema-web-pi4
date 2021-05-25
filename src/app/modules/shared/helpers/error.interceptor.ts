import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: LoginService, private router: Router, private roleGuardService: RoleGuardService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
       // this.authenticationService.logout();
      } else if ([403].indexOf(err.status) !== -1) {
        this.router.navigate(['']);
      } else if (!([404].indexOf(err.status) !== -1)) {
     //  this.authenticationService.logout();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
