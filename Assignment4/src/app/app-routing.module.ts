import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'favourites',
    loadChildren: () => import('./favourites-list/favourites-list.module').then( m => m.FavouritesListPageModule)
  },
  {
    path: 'forecast/:name',// passing name here which will be the city name which lets you api forecast of that location
    loadChildren: () => import('./forecast-list/forecast-list.module').then( m => m.ForecastListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
