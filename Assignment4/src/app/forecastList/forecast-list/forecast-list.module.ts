import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForecastListPageRoutingModule } from './forecast-list-routing.module';

import { ForecastListPage } from './forecast-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForecastListPageRoutingModule
  ],
  declarations: [ForecastListPage]
})
export class ForecastListPageModule {}
