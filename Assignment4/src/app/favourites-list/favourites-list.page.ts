import { Component, OnInit } from '@angular/core';
import { WeatherControllerService } from './../services/weather-controller.service';
import { Storage } from '@ionic/storage-angular';//idt that anything other than favourite's service needs this
import { FavouritesService }from './../services/favourites.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
})
export class FavouritesListPage implements OnInit {

  favNames;//string array to hold each of the cityNames of FavLocations
  //favDisplay: string;
  favDisplay;
  //store= new Storage();
  constructor(private weatherControllerService: WeatherControllerService, private favouritesService: FavouritesService) {
    //this.store.create();
    // // Verify if the platform is ready to use
    // this.platform.ready()
    //   .then(() => {
    //     this.loadItems();
    //   });
   }

  ngOnInit() {
    
    this.favNames = this.favouritesService.getItems()
    console.log(this.favNames);
    this.loadItems();
    //idk if I need drivers here
    //await this.storage.create();
    //this.favouritesService.get()
     
    // .then(data => {
    //   // Now, populate the array with data from the weather service
    //   for(let name of data ) {
    //     // We have data, so lets do something with it
    //     console.log('favourites page data', name.cityName);
    //     this.favNames.push(name.cityName);
    //     console.log('favItems', this.favNames);
    //   }
    // },
    //   error => {
    //     // Hide the loading indicator

    //     console.error('Error retrieving favs data');
    //     console.dir(error);

    //   }
    // );
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
