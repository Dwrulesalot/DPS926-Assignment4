import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherManagerService } from 'src/app/services/weather-manager.service';//src/app/folderHere looks better than ../folderHere
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  results: Observable<any>;
  query = '';

  constructor(private weatherManagerService: WeatherManagerService) {  }

  ngOnInit(){
    this.results = this.weatherManagerService.GetQueryData('Toronto');//Default Display - unless I want to create some place holders or better yet use location data!
  }
  searchClicked(){
    this.results = this.weatherManagerService.GetQueryData(this.query);

    // this.results.subscribe(res => {  }) //going to do *ngFor instead to display
  }

}
