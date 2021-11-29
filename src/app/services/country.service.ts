import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import {environment} from "../../environments/environment";

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/country/list`, {params});
  }

  getAllGdp(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/country/gdp`, {params});
  }

  get(id: any): Observable<Country> {
    return this.http.get(`${baseUrl}/country/find/by/id?countryId=${id}`);
  }

  getDetails(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/country/details`, {params});
  }

  getRegions(params: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/region/list`, {params});
  }
}
