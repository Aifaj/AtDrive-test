import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.scss'
})
export class Weather {
 loading = false;
  error: string | null = null;
  weather: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather();
  }

 getWeather() {
  this.loading = true;
  this.error = null;

  const defaultLat = 21.1458;
  const defaultLon = 79.0882;

  // If geolocation is not supported → use default
  if (!navigator.geolocation) {
    this.fetchWeather(defaultLat, defaultLon);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.fetchWeather(lat, lon);
    },

    (err) => {
      // If user denies or error occurs → use default location
      this.fetchWeather(defaultLat, defaultLon);
    }
  );
}


fetchWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  this.http.get(url).subscribe({
    next: (res: any) => {
      this.weather = res.current_weather;
      this.loading = false;
    },
    error: () => {
      this.error = "Failed to fetch weather.";
      this.loading = false;
    }
  });
}


}
