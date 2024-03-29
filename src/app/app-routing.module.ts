import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountriesListComponent} from './components/countries-list/countries-list.component';
import {HomeComponent} from "./components/home/home.component";
import {CountryLanguagesComponent} from "./components/country-languages/country-languages.component";
import {CountriesGdpComponent} from "./components/countries-gdp/countries-gdp.component";
import {CountriesDetailsComponent} from "./components/countries-details/countries-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'countries', component: CountriesListComponent},
  {path: 'countries/:id', component: CountryLanguagesComponent},
  {path: 'gdp', component: CountriesGdpComponent},
  {path: 'details', component: CountriesDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
