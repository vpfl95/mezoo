import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EcgComponent } from './ecg/ecg.component';
import { RespirationComponent } from './respiration/respiration.component';

@NgModule({
  declarations: [
    AppComponent,
    EcgComponent,
    RespirationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
