import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = "f33d0851ca3e4a9a83630733212606";
const BaseURL = "http://api.weatherapi.com/v1";

//could help filter search results by location in future
// export enum FilterType{
//   all='',
//   city='city',
//   region='region',
//   country='country'
// }

//export location, current, condition here aswell as their non metric specific values, maybe if favourites only export forecast and isMetric, id 

@Injectable({
  providedIn: 'root'
})
export class WeatherManagerService {

  isMetricPublic:boolean;

  constructor(private httpClient: HttpClient) {
    this.isMetricPublic = true;//test if this doesn't set to true on close/ reopen, i'll have to create a method updating isMetricPublic's value later
  }
  GetCurrentWeatherData(city: string) {//todo call from favourites list/favourites service to populate each item in the list
    return this.httpClient.get(
      `${BaseURL}/current.json?key=${apiKey}&q=${city}&aqi=no`
    ).pipe(
      map(results => {
        console.log('RAW CURRENT WEATHER: ', results);
        return results['Current Weather']
      })
    );
  }
  
  GetQueryData(query: string): Observable<any>{//call from homepage/querylist - honestly probably get rid of one of them to ease the page building
    return this.httpClient.get(
      `${BaseURL}/search.json?key=${apiKey}&q=${query}`
    ).pipe(
      map(results => {
        console.log('RAW SEARCH: ', results);
        return results['Search']
      })
    );
  }
  GetForecastData(city: string) {//call from forcast list
    return this.httpClient.get(
      `${BaseURL}/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
    ).pipe(
      map(results => {
        console.log('RAW FORECAST: ', results);
        return results['Weather Forecast']
      })
    );
  }

}
