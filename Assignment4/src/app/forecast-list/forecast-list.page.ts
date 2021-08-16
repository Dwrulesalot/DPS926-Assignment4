import { Component} from '@angular/core';
import { WeatherControllerService } from './../services/weather-controller.service';
import { FavouritesService } from './../services/favourites.service';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.page.html',
  styleUrls: ['./forecast-list.page.scss'],
})
export class ForecastListPage{

  titleName='';//todo change this to be forecast's path need router
  forecastItems;


  constructor(private weatherControllerService: WeatherControllerService, private favouritesService: FavouritesService) { }

  //todo change this to be forecast's path
  ngAfterContentInit(){
    if(this.weatherControllerService.cityName!='' ||this.weatherControllerService.cityName!=null){
      this.titleName = this.weatherControllerService.cityName;
      this.updateForecastWeather(this.weatherControllerService.cityName);
  }
  }

  addToFavClicked(){
    //this.newFav.cityName = this.titleName;
    this.favouritesService.set('my-favs',this.titleName);
    
    //this.newFav.cityName ='';//only holds it temporarily

  }

  updateForecastWeather(cityName: string) {
    console.log('ForecastPage: updateForecastWeather()');
    // clear out the previous array contents
    this.forecastItems = [];
    // Create the loading indicator
        this.weatherControllerService.getForecastData(cityName)
          .then(data => {
            // Now, populate the array with data from the weather service
            if (data) {
              this.titleName=data.city.name;
              // We have data, so lets do something with it
              console.log('forecast page data', data);
              this.forecastItems=data.list;
              console.log('forecastItems', this.forecastItems);
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
