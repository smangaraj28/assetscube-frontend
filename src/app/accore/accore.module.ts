import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { ApiserviceService } from './apiservice/apiservice.service';
import { AcinterceptorService } from './interceptor/acinterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FireauthService } from './fireauth/fireauth.service';
import { AnalyticsService } from './analytics/analytics.service';
import { Genericservice } from './genericservice/genericservice.service';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    //Genericservice  
  ],
  declarations: [],
  providers: [
    ApiserviceService,
    AcinterceptorService,
    {provide: HTTP_INTERCEPTORS, useClass: AcinterceptorService, multi: true, },
    FireauthService,
    AnalyticsService,
    Genericservice    
  ]
})
export class AccoreModule { }
