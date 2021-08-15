import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherControllerService } from './../services/weather-controller.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  results: Observable<any>;//results of the query/search
  currentWeatherDisplay: Observable<Array<any>>;//delete if other way works
  
  query = '';//hurray two way binding

  constructor(private weatherControllerService: WeatherControllerService) {}

  ngOnInit(){
    this.results = this.weatherControllerService.GetQueryData('Toronto');//Default Display - unless I want to create some place holders or better yet use location data!
  }
  searchClicked(){
    if(this.query!=null && this.query!=''){

    this.results = this.weatherControllerService.GetQueryData(this.query);
    //this.results.subscribe()//probaly should do this in controller?

    this.currentWeatherDisplay

    this.results.subscribe(cities => {
      for(let city of cities){
        
        //this.currentWeatherDisplay = 
        this.weatherControllerService.GetCurrentWeatherData(city.name).subscribe(city => {
          for(let data of city){          
          this.currentWeatherDisplay += data;//this overwrites
          }
        });
        
      }
    console.log(this.currentWeatherDisplay);
    })
//  this.currentWeatherDisplay.subscribe(res => {  //instead of doing this I'll have the getQueryData loop through 
//   for(let item of res){ }
//  })
    } else {
      //make an alert here 
    }
    
  }

    

}
