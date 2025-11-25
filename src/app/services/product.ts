import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {
   private base = `${environment.apiBase}/products`;

  constructor(private http: HttpClient) {}

  list(): Observable<any> { return this.http.get(this.base); }
  create(payload: any): Observable<any> { return this.http.post(this.base, payload); }
  get(id: string): Observable<any> { return this.http.get(`${this.base}/${id}`); }
  update(id: string, payload: any): Observable<any> { return this.http.put(`${this.base}/${id}`, payload); }
  delete(id: string): Observable<any> { return this.http.delete(`${this.base}/${id}`); }
  
}
