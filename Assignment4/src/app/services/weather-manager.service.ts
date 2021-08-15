import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const apiKey = "f33d0851ca3e4a9a83630733212606";
const BaseURL = "http://api.weatherapi.com/v1";


@Injectable({
  providedIn: 'root'
})
export class WeatherManagerService {
  constructor(private httpClient: HttpClient) {}
  GetCurrentWeatherData(city: string) {
    return this.httpClient.get(
      `${BaseURL}/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
  }
  GetQueryData(query: string) {
    return this.httpClient.get(
      `${BaseURL}/search.json?key=${apiKey}&q=${query}`
    );
  }
  GetForecastData(city: string) {
    return this.httpClient.get(
      `${BaseURL}/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
    );
  }

}
