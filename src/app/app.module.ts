import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { EcgComponent } from './ecg/ecg.component';
import { RespirationComponent } from './respiration/respiration.component';
import { InformationComponent } from './information/information.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { HistoryComponent } from './history/history.component';
import { EcgHistoryComponent } from './ecg-history/ecg-history.component';

@NgModule({
  declarations: [
    AppComponent,
    EcgComponent,
    RespirationComponent,
    InformationComponent,
    MapComponent,
    MonitorComponent,
    HistoryComponent,
    EcgHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCx86vDGeGD9pUfV8GL4pIrGzMIq5V6K5o'
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
