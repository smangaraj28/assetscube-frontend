import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AcsharedModule} from '../../acshared';


import { GoldRoutingModule } from './gold-routing.module';
import { GolddashComponent } from './golddash/golddash.component';
import { GoldsummaryComponent } from './goldsummary/goldsummary.component';


@NgModule({
  declarations: [GolddashComponent, GoldsummaryComponent],
  imports: [
    CommonModule,
    AcsharedModule,
    GoldRoutingModule
  ]
})
export class GoldModule { }
