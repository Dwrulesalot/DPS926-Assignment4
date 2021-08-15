import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForecastListPage } from './forecast-list.page';

const routes: Routes = [
  {
    path: '',
    component: ForecastListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastListPageRoutingModule {}
