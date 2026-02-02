import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: Auth) {}

 intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('token');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          alert("Session expired. Please login again.");
          this.authService.logout();
          location.reload();
        }
        return throwError(() => err);
      })
    );
  }
}
