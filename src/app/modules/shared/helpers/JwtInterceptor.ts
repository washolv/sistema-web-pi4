import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: LoginService ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let jwt = localStorage.getItem('access_token');
        if (jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        }

        return next.handle(request);
    }
}
