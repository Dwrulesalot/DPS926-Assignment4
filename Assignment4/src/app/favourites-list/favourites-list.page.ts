import { Component, OnInit } from '@angular/core';
import { WeatherControllerService } from './../services/weather-controller.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
})
export class FavouritesListPage implements OnInit {

  constructor(private weatherControllerService: WeatherControllerService) { }

  ngOnInit() {
  }
  //set's the value for details page - eventually change to router
  cityClicked(city: string){
    this.weatherControllerService.cityName=city;
    console.log("cityClicked: "+city);
  }

}
