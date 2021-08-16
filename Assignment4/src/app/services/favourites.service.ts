import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
//import { WeatherControllerService } from './../services/weather-controller.service';

export class FavLocations {
  //id: number;
  //isMetric: boolean;
  cityName: string;
  //maybe coords in future
}

const FAVOURITES_KEY = 'my-favourites';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private storage: Storage) { }

 //not sure if this works but I'm runnning out of time fast
  addFavourite(favLocation: FavLocations): Promise<any>{
    return this.storage.get(FAVOURITES_KEY).then((favs: FavLocations[]) =>{
      if (favs){
        //should loop through here to before pushing to see if it doesn't alread exist - can I return an alert in this promise? will return null for now and hope to remember catching it
        for (let i of favs){
          if(i.cityName === favLocation.cityName){
            return null;//try to return an alert or notif if possible
          } else {
            
            favs.push(favLocation);
            return this.storage.set(FAVOURITES_KEY, favs);
          }
        }
      } else {
        return this.storage.set(FAVOURITES_KEY, [favLocation]);
      }
    })
  }

  getFavourites(): Promise<any>{
    return this.storage.get(FAVOURITES_KEY)
  }

// //updates the isMetric: boolean in the storage array
// updateIsMetric(bool: boolean):Promise<any>{
//   return this.storage.get(FAVOURITES_KEY).then((favs: FavouriteWeather[]) =>{
//     if (!favs || favs.length == 0 ){
//       return null;//
//     } 

//     for (let i of favs){
//       i.isMetric = bool;
//     }
//     return this.storage.set(FAVOURITES_KEY, favs);//updates storage values
    
//   });
// }

//delete based off of full name - remember no spaces or other chars
deleteFavourite(favLocation: FavLocations): Promise<any>{
  return this.storage.get(FAVOURITES_KEY).then((favs: FavLocations[]) =>{
    if (!favs || favs.length == 0 ){
      return null;//
    } 

    for (let i of favs){
      if(i.cityName === favLocation.cityName){
        
        return favs.splice(favs.indexOf(i), 1);//not sure how this will effect the id, gotta be careful not to break the storage //if this breaks something the
        //return null;//try to return an alert or notif if possible
      } //else {
        
      //   //favs.push(favLocation);
      //   return this.storage.set(FAVOURITES_KEY, favs);
      // }
    }
    return null;//this should be impossible unless I mess up favFullName definition as I want to only call this function from a currently displayed item in favouritesList
  });
}

}
