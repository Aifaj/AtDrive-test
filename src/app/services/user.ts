import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class User {
  
 private baseUrl = environment.apiBase;

 constructor(private http: HttpClient) {}

  getAllUser(url:any){
    return this.http.get(`${this.baseUrl}${url}`);
  }

  
}
