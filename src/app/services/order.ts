import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Order {
  private base = `${environment.apiBase}/orders`;

  constructor(private http: HttpClient) {}

   listByUser(): Observable<any> {
    const userId = sessionStorage.getItem('userId'); 
    return this.http.get(`${this.base}?userId=${userId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.base, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

}
