import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //we intercept http requests
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the error status is 401 (unauthorized), the token is expired
        if (error.status === 401) {
          // we logout the user
          const userService = this.injector.get(UserService); //we inject the service here to prevent circular dependencies
          userService.logOut();
        }

        return throwError(error);
      })
    );
  }
}
