import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherControllerService } from './../services/weather-controller.service';
import { Storage } from "@ionic/storage-angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //results: Observable<any>;//results of the query/search
  //currentWeatherDisplay: [];//delete if other way works
  
  query = '';//hurray two way binding
  
  // current weather items array
  currentItems;
  // forecast items array
  //forecastItems: Array<any> = [];//here or in forecast list?

  // array of day strings used when rendering data

  //storage: Storage;//need only in forecast rn - if slide worked I would have used that to add to favourites

  constructor(private weatherControllerService: WeatherControllerService) {}

  ngOnInit(){
   this.updateCurrentWeather('Toronto');//todo change this out to Cities in circle api call with lat, lon
   this.weatherControllerService.cityName ='Toronto';
  }
   searchClicked(){
     if(this.query!=null && this.query!=''){
      this.updateCurrentWeather(this.query);
     }
    }
    cityClicked(city: string){
      this.weatherControllerService.cityName =city;
      console.log("cityClicked: "+city);
    }

//     this.results = this.weatherControllerService.GetQueryData(this.query);
//     //this.results.subscribe()//probaly should do this in controller?
//     this.results.subscribe(cities => {
//       for(let city of cities){

//         //this.currentWeatherDisplay =
//         this.weatherControllerService.GetCurrentWeatherData(city.name).subscribe(city => {
//           for(let data of city){
//           this.currentWeatherDisplay = data;//this overwrites
//           }
//         });

//       }
//     console.log(this.currentWeatherDisplay);
//     })
// //  this.currentWeatherDisplay.subscribe(res => {  //instead of doing this I'll have the getQueryData loop through
// //   for(let item of res){ }
// //  })
//     } else {
//       //make an alert here
//     }

//   }

updateCurrentWeather(cityName: string) {
  console.log('HomePage: updateCurrentWeather()');
  // clear out the previous array contents
  this.currentItems = [];
  // Create the loading indicator
      this.weatherControllerService.getCurrentWeatherData(cityName)
        .then(data => {
          // Now, populate the array with data from the weather service
          if (data) {
            // We have data, so lets do something with it
            console.log('home page data', data);
            this.currentItems.push(data);
            console.log('currentItems', this.currentItems);
          }
        },
          error => {
            // Hide the loading indicator

            console.error('Error retrieving weather data');
            console.dir(error);

          }
        );

}




}