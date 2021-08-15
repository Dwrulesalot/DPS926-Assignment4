import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
  path: 'forecastList/:fullName',// passing fullName here which will be city+region+county lets you api call the 7 day forecast of that location
    loadChildren: () => import('./forecastList/forecast-list/forecast-list.module').then( m => m.ForecastListPageModule)
  },
  {
    path: 'favouritesList',
    loadChildren: () => import('./favouritesList/favourites-list/favourites-list.module').then( m => m.FavouritesListPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
