import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//export location, current, condition here aswell as their non metric specific values, maybe if favourites only export forecast and isMetric, id 
//export interface etc. ^^not really sure I need these models here but will defs need them to save into FavouritesService's storage

@Injectable({
  providedIn: 'root'
})
export class WeatherControllerService {
  apiKey = `f33d0851ca3e4a9a83630733212606`;
  BaseURL = `http://api.weatherapi.com/v1`;
  isMetricPublic:boolean;

  constructor(private http: HttpClient) { 
    this.isMetricPublic = true;//test if this doesn't set to true on close/ reopen, i'll have to create a method updating isMetricPublic's value later
  }

  //might want to create a SaveCurrentWeatherData that's similar but return an object of type favourites instead? 
  //that or instead of returning pipe/mapping to that object and calling addFavourite() which I still need to fix
  GetCurrentWeatherData(city: string): Observable<any> {//todo call from favourites list/favourites service to populate each item in the list
    return this.http.get(
      `${this.BaseURL}/current.json?key=${this.apiKey}&q=${encodeURI(city)}&aqi=no`//was missing encodeURI() holy
    ).pipe(
      map(results => {
        console.log('RAW: ', results);
        return results;//might need to rename results so it's only used in favourites
      })
    );
  }

  GetQueryData(query: string): Observable<any>{//call from homepage
    return this.http.get(
      `${this.BaseURL}/search.json?key=${this.apiKey}&q=${encodeURI(query)}`
    ).pipe(
      map(results => {
        console.log('RAW: ', results);
        return results;
      })
    );
  }

  GetForecastData(city: string): Observable<any> {//call from forcast list
    return this.http.get(
      `${this.BaseURL}/forecast.json?key=${this.apiKey}&q=${encodeURI(city)}&days=7&aqi=no&alerts=no`
    ).pipe(
      map(results => {
        console.log('RAW: ', results);
        return results;//might need to rename results so it's only used in forecast
      })
    );
  }

}
