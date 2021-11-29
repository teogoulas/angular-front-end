import { Component, OnInit } from '@angular/core';
import {Country} from "../../models/country.model";
import {CountryService} from "../../services/country.service";
import {Router} from "@angular/router";
import {getRequestParams} from "../../services/utils";

@Component({
  selector: 'app-countries-gdp',
  templateUrl: './countries-gdp.component.html',
  styleUrls: ['./countries-gdp.component.scss']
})
export class CountriesGdpComponent implements OnInit {
  gridApi: any;
  countries: Country[] = [];
  page = -1;
  count = 0;
  pageSize = 10;
  asc = false;
  by = 'countryId';
  pageSizes = [10, 20, 50];
  rowSelection = 'single';
  columnDefs = [
    {headerName: 'Country Name', field: 'name', sortable: true},
    {headerName: 'Country Code', field: 'countryCode3', sortable: true},
    {headerName: 'Year', valueGetter: this.getYear, sortable: true},
    {headerName: 'Population', valueGetter: this.getPopulation, sortable: true},
    {headerName: 'GDP', valueGetter: this.getGdp, sortable: true},
  ];

  constructor(private countryService: CountryService, public router: Router) { }

  ngOnInit(): void {
    this.getCountries();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.gridApi.paginationSetPageSize(Number(this.pageSize))
  }

  getYear(params: any): number {
    return params.data.countryStats[0].year
  }

  getPopulation(params: any): number {
    return params.data.countryStats[0].population
  }

  getGdp(params: any): number {
    return params.data.countryStats[0].gdp
  }

  getCountries(): void {
    const params = getRequestParams({}, this.page, this.pageSize, this.asc, this.by);
    this.countryService.getAllGdp(params)
      .subscribe(
        response => {
          const { payload, totalPages } = response;
          this.countries = payload;
          this.count = totalPages;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.getCountries();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

}
