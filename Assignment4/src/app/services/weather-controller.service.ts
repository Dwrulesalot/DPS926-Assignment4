import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//export location, current, condition here aswell as their non metric specific values, maybe if favourites only export forecast and isMetric, id
//export interface etc. ^^not really sure I need these models here but will defs need them to save into FavouritesService's storage
//coord: Object { "lon": -79.4163, "lat": 43.7001 }//Toronto coords for later



@Injectable({
  providedIn: 'root'
})
export class WeatherControllerService {
  apiKey = `1ca0b8247cdbbc258872865816a562ad`;
  BaseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
  //isMetricPublic: boolean;//todo
  
  cityName ="Toronto";


  constructor(private http: HttpClient) {
    //this.isMetricPublic = true;//test if this doesn't set to true on close/ reopen, i'll have to create a method updating isMetricPublic's value later
  }

  //might want to create a SaveCurrentWeatherData that's similar but return an object of type favourites instead?
  //that or instead of returning pipe/mapping to that object and calling addFavourite() which I still need to fix
  getCurrentWeatherData(city: string): Promise<any> {//todo call from favourites list/favourites service to populate each item in the list
    console.log(city);
    return new Promise((resolve, reject) => {
      console.log("getCurrentWeatherData: ",`${this.BaseURL}${encodeURI(city)}&appid=${this.apiKey}&units=metric`);//test
      this.http.get(
        `${this.BaseURL}${encodeURI(city)}&appid=${this.apiKey}&units=metric`//was missing encodeURI() holy
      ).subscribe(data => {
        resolve(data);
      }, error =>{
        console.log(error.message);
        reject(error.message);
      });
    });
  }

  //should I change city: string to this.cityName?
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

  // GetQueryData(query: string): Observable<any>{//call from homepage - gunna have each q

  //   //gets the query's list of names and
  //   //this.queryResults
  //   return this.http.get(//will this.queryResults =
  //     `${this.BaseURL}/search.json?key=${this.apiKey}&q=${encodeURI(query)}`
  //   ).pipe(
  //     map(results => {
  //       console.log('RAW: ', results);
  //       //this.queryResults = results;//this might needs to be outside

  //       return results;//this goes into this.queryResults doesn't leave the method
  //     })
  //   );

  //   // would this work ?

  //   //for(let i of this.queryResults){
  //     //
  //   //}
  //   //return this.queryResults;//temp to test

  //   //I want this.queryResult[i]
  // }

  // GetForecastData(city: string): Observable<any> {//call from forcast list
  //   return this.http.get(
  //     `${this.BaseURL}/forecast.json?key=${this.apiKey}&q=${encodeURI(city)}&days=7&aqi=no&alerts=no`
  //   ).pipe(
  //     map(results => {
  //       console.log('RAW: ', results);
  //       return results;//might need to rename results so it's only used in forecast
  //     })
  //   );
  // }

}