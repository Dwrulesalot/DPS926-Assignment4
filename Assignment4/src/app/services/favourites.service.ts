import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface FavouriteWeather {
  id: number;
  isMetric: boolean;
  current: {
    temp: string;
    precip: string;
    temp_c: number;
    temp_f: number;
    condition: {
      conditionText: string;
      conditionIcon: string;
    }
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
  } 
  location:{
    name: string;
    region: string;
    country: string;
  }

}

const FAVOURITES_KEY = 'my-favourites';//should I store this info in a map/image instead of an array? 
// *facepalm* I defs should... let me make the maps from my three api calls into currentWeather items / forecast items / and I guess query items? - maybe not that last 1

@Injectable({
  providedIn: 'root'
})
//all these functions(except getFavourites) suggest being turned into an async function, do I need to tho? 
//I rather the certainy the task gets completed even if it's slower and not the deadlock of nightmares like Ass2
export class FavouritesService {

  constructor(private storage: Storage) { }

  //creates new FavouriteWeather item - should maybe check that this item doesn't already exist in storage?
  addFavourite(favouriteWeather: FavouriteWeather): Promise<any>{
    return this.storage.get(FAVOURITES_KEY).then((favs: FavouriteWeather[]) =>{
      if (favs){
        //should loop through here to before pushing to see if it doesn't alread exist - can I return an alert in this promise? will return null for now and hope to remember catching it
        for (let i of favs){
          if(i.location.name === favouriteWeather.location.name && i.location.region === favouriteWeather.location.region && i.location.country === favouriteWeather.location.country){
            return null;//try to return an alert or notif if possible
          } else {
            
            favs.push(favouriteWeather);
            return this.storage.set(FAVOURITES_KEY, favs);
          }
        }
      } else {
        return this.storage.set(FAVOURITES_KEY, [favouriteWeather]);
      }
    })

  }

  //read
  getFavourites(): Promise<any>{
    return this.storage.get(FAVOURITES_KEY)
  }

  //updates the isMetric: boolean in the storage array
  updateIsMetric(bool: boolean):Promise<any>{
    return this.storage.get(FAVOURITES_KEY).then((favs: FavouriteWeather[]) =>{
      if (!favs || favs.length == 0 ){
        return null;//
      } 

      for (let i of favs){
        i.isMetric = bool;
      }
      return this.storage.set(FAVOURITES_KEY, favs);//updates storage values
      
    });
  }

  //delete based off of full name - remember no spaces or other chars
  deleteFavourite(favFullName: string): Promise<any>{
    return this.storage.get(FAVOURITES_KEY).then((favs: FavouriteWeather[]) =>{
      if (!favs || favs.length == 0 ){
        return null;//
      } 

      for (let i of favs){
        let temp: string = i.location.name + i.location.region + i.location.country;
        if( temp === favFullName){
          
          favs.splice(favs.indexOf(i), 1);//not sure how this will effect the id, gotta be careful not to break the storage //if this breaks something the
          return this.storage.set(FAVOURITES_KEY, favs);//should I return something else?
        } 
      }
      return null;//this should be impossible unless I mess up favFullName definition as I want to only call this function from a currently displayed item in favouritesList
    });
  }
}
