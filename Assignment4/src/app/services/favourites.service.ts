import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

//const 

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  //private _storage: Storage | null = null;
  FAVOURITES_KEY;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    this.FAVOURITES_KEY = Math.random().toString();
    await this.storage.set(this.FAVOURITES_KEY, value);
    console.log(key);
    console.log(value);
  }

//   public async get(){
//     await this.storage.keys()
//     // let array: Array<string>;//string[]=[];
//     // array[0]='';
//     // await this._storage.forEach((key, value, index) => {
//     //   array.push(value);

//     // });
//     // return array;
//    //await this.storage.keys();
//   }
  
// }
// Read
getItems(): Promise<string[]> {
  return this.storage.keys()   .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  // let array: Array<string>;
  // this.storage.forEach((key, value, index) => {
  //   array.push(value);
  // }).then(() => {
    
  // });
  // return
  //return this.storage.get(FAVOURITES_KEY); // Get all values
}

}


// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// //import { WeatherControllerService } from './../services/weather-controller.service';
// import { Component, OnInit } from '@angular/core';

// export class FavLocations {
//   //id: number;
//   //isMetric: boolean;
//   cityName: string;
//   //maybe coords in future
// }

// const FAVOURITES_KEY = 'my-favourites';

// @Injectable({
//   providedIn: 'root'
// })
// export class FavouritesService implements OnInit{

//   constructor(private storage: Storage) { }

//   //not sure if this is the right way to do this but I'm out of time 
//   async ngOnInit(){
//   //idk if I need drivers here
//     await this.storage.create();
//   }

//  //not sure if this works but I'm runnning out of time fast
//   addFavourite(favLocation: FavLocations): Promise<any>{
//     return this.storage.get(FAVOURITES_KEY).then((favs: FavLocations[]) =>{
//       if (favs){
//         //should loop through here to before pushing to see if it doesn't alread exist - can I return an alert in this promise? will return null for now and hope to remember catching it
//         for (let i of favs){
//           if(i.cityName === favLocation.cityName){
//             return null;//try to return an alert or notif if possible
//           } else {
            
//             favs.push(favLocation);
//             return this.storage.set(FAVOURITES_KEY, favs);
//           }
//         }
//       } else {
//         return this.storage.set(FAVOURITES_KEY, [favLocation]);
//       }
//     })
//   }

//   getFavourites(): Promise<any>{
//     return this.storage.get(FAVOURITES_KEY)
//   }

// // //updates the isMetric: boolean in the storage array
// // updateIsMetric(bool: boolean):Promise<any>{
// //   return this.storage.get(FAVOURITES_KEY).then((favs: FavouriteWeather[]) =>{
// //     if (!favs || favs.length == 0 ){
// //       return null;//
// //     } 

// //     for (let i of favs){
// //       i.isMetric = bool;
// //     }
// //     return this.storage.set(FAVOURITES_KEY, favs);//updates storage values
    
// //   });
// // }

// //delete based off of full name - remember no spaces or other chars
// deleteFavourite(favLocation: FavLocations): Promise<any>{
//   return this.storage.get(FAVOURITES_KEY).then((favs: FavLocations[]) =>{
//     if (!favs || favs.length == 0 ){
//       return null;//
//     } 

//     for (let i of favs){
//       if(i.cityName === favLocation.cityName){
        
//         return favs.splice(favs.indexOf(i), 1);//not sure how this will effect the id, gotta be careful not to break the storage //if this breaks something the
//         //return null;//try to return an alert or notif if possible
//       } //else {
        
//       //   //favs.push(favLocation);
//       //   return this.storage.set(FAVOURITES_KEY, favs);
//       // }
//     }
//     return null;//this should be impossible unless I mess up favFullName definition as I want to only call this function from a currently displayed item in favouritesList
//   });
// }

// }
