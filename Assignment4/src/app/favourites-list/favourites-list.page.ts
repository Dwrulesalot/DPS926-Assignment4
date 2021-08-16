import { Component, OnInit } from '@angular/core';
import { WeatherControllerService } from './../services/weather-controller.service';

import { FavouritesService }from './../services/favourites.service';



@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
})
export class FavouritesListPage implements OnInit {

  favNames;//string array to hold each of the cityNames of FavLocations

  favDisplay;

  constructor(private weatherControllerService: WeatherControllerService, private favouritesService: FavouritesService) {
   }

  ngOnInit() {
    
    this.favNames = this.favouritesService.getItems()
    console.log(this.favNames);
    this.loadItems();
  }
  loadItems() {
    this.favDisplay = [];
    this.favouritesService.getItems()
      .then(items => {
        for(let item of items){
        //this.favDisplay.push(item);
        
        this.weatherControllerService.getCurrentWeatherData(item).then((data)=>{
          if (data) {
          this.favDisplay.push(data);
          console.log('FAVdisplay: '+this.favDisplay);
          console.log('DATA: '+data);}
        },
        error => {
          // Hide the loading indicator

          console.error('Error retrieving weather data');
          console.dir(error);

        });
        console.log('load items:'+items);}
      });
  }
  

  updateFavsList(){
    
  }

  //set's the value for details page - eventually update to router module?
  cityClicked(city: string){
    this.weatherControllerService.cityName=city;
    console.log("cityClicked: "+city);
  }

}
