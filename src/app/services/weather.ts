import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Weather {
   private base = `${environment.apiBase}/public/weather`;

  constructor(private http: HttpClient) {}

  getWeather(lat?: number, lon?: number): Observable<any> {
    let q = '';
    if (lat !== undefined && lon !== undefined) q = `?lat=${lat}&lon=${lon}`;
    return this.http.get(`${this.base}${q}`);
  }
}
