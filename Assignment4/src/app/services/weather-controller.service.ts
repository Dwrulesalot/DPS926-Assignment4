import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherControllerService {
  apiKey = `1ca0b8247cdbbc258872865816a562ad`;
  BaseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
  //isMetricPublic: boolean;//todo
  
  cityName ="Toronto";


  constructor(private http: HttpClient) {
    //this.isMetricPublic = true;//todo
  }

  
  getCurrentWeatherData(city: string): Promise<any> {//todo call from favourites list/favourites service to populate each item in the list
    console.log(city);
    return new Promise((resolve, reject) => {

      console.log("getCurrentWeatherData: ",`${this.BaseURL}${encodeURI(city)}&appid=${this.apiKey}&units=metric`);

      this.http.get(
        `${this.BaseURL}${encodeURI(city)}&appid=${this.apiKey}&units=metric`
      ).subscribe(data => {
        resolve(data);
      }, error =>{
        console.log(error.message);
        reject(error.message);
      });
    });
  }

  
  getForecastData(city: string): Promise<any> {//todo call from favourites list/favourites service to populate each item in the list
    console.log(city);
    return new Promise((resolve, reject) => {
      this.http.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(city)}&appid=${this.apiKey}&units=metric`//maybe change baseURL later
      ).subscribe(data => {
        resolve(data);
      }, error =>{
        console.log(error.message);
        reject(error.message);
      });
    });
  }
  
}