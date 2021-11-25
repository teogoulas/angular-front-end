import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountriesListComponent} from './components/countries-list/countries-list.component';
import {CountryDetailsComponent} from './components/country-details/country-details.component';
import {AddCountryComponent} from './components/add-country/add-country.component';
import {HomeComponent} from "./components/home-component/home.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', pathMatch: 'full', component: HomeComponent},
  {path: 'countries', component: CountriesListComponent},
  {path: 'countries/:id', component: CountryDetailsComponent},
  {path: 'add', component: AddCountryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
