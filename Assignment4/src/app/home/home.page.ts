import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherControllerService } from './../services/weather-controller.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  results: Observable<any>;
  query = '';//does this two way binding work?

  constructor(private weatherControllerService: WeatherControllerService) {}

  ngOnInit(){
    this.results = this.weatherControllerService.GetQueryData('Toronto');//Default Display - unless I want to create some place holders or better yet use location data!
  }
  searchClicked(){
    if(this.query!=null && this.query!=''){
    this.results = this.weatherControllerService.GetQueryData(this.query);
    } else {
      //make an alert here
    }
    // this.results.subscribe(res => {  })//subscribe is how to get data from an observable //going to do *ngFor instead to display
  }
    

}
