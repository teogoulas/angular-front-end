import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgGridModule} from "ag-grid-angular";
import {HomeComponent} from "./components/home/home.component";
import {NgxPaginationModule} from "ngx-pagination";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CountryLanguagesComponent } from './components/country-languages/country-languages.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesGdpComponent } from './components/countries-gdp/countries-gdp.component';
import { CountriesDetailsComponent } from './components/countries-details/countries-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryLanguagesComponent,
    CountriesListComponent,
    CountriesGdpComponent,
    CountriesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
