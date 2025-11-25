import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class Auth {
 private base = `${environment.apiBase}/users`;

  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(`${this.base}/login`, payload).pipe(
      tap((res: any) => {
        // Save in session storage
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    localStorage.removeItem('cart');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

}
