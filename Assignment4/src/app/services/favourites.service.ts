import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  FAVOURITES_KEY;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    //randomly generating keys and displaying all
    this.FAVOURITES_KEY = Math.random().toString();
    await this.storage.set(this.FAVOURITES_KEY, value);
    console.log(key);
    console.log(value);
  }


// Read
getItems(): Promise<string[]> {
  return this.storage.keys()   .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  
}

}


