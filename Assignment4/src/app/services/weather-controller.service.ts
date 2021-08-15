import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//export location, current, condition here aswell as their non metric specific values, maybe if favourites only export forecast and isMetric, id 
//export interface etc. ^^not really sure I need these models here but will defs need them to save into FavouritesService's storage
export interface Location {
  name: string;
  region: string;
  country": string;
}
export interface Current {
  temp: string;
  "region": string;
  "country": string;
  "temp_c": 22.0;
  "temp_f": 71.6;
  "condition": Condition;
}
export interface Condition {
  "text": string,
  "icon": string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherControllerService {
  apiKey = `f33d0851ca3e4a9a83630733212606`;
  BaseURL = `http://api.weatherapi.com/v1`;
  isMetricPublic:boolean;
  //queryResults = [];//
  //queryResults: Observable<any>;//should this be an array?


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
        console.log('CW: ', results);
        
        return results;//might need to rename results so I can use the different data set? or I might only need to do that in the page.ts files 
      })
    );
  }

  GetQueryData(query: string): Observable<any>{//call from homepage - gunna have each q
    
    //gets the query's list of names and 
    //this.queryResults 
    return this.http.get(//will this.queryResults = 
      `${this.BaseURL}/search.json?key=${this.apiKey}&q=${encodeURI(query)}`
    ).pipe(
      map(results => {
        console.log('RAW: ', results);
        //this.queryResults = results;//this might needs to be outside
        
        return results;//this goes into this.queryResults doesn't leave the method
      })
    );

    // would this work ?
    
    //for(let i of this.queryResults){
      //
    //}
    //return this.queryResults;//temp to test 
    
    //I want this.queryResult[i]
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
