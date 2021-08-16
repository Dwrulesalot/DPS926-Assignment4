import { Component, OnInit } from '@angular/core';
import { WeatherControllerService } from './../services/weather-controller.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  query = '';// two way binding
  
  currentItems;

  constructor(private weatherControllerService: WeatherControllerService) {}

  ngOnInit(){
    //populating menu with base cities
   this.updateCurrentWeather('Toronto');
   this.updateCurrentWeather('Quebec City');
   this.updateCurrentWeather('Vancouver');
   this.updateCurrentWeather('Calgary');
   this.updateCurrentWeather('Ottawa');
   this.updateCurrentWeather('Charlottetown');
   this.updateCurrentWeather('Saskatoon');
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