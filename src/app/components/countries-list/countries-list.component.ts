import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {
  gridApi: any;
  countries: Country[] = [];
  selectedCountry: Country = {};
  currentIndex = -1;
  title = '';
  page = -1;
  count = 0;
  pageSize = 10;
  asc = false;
  by = 'countryId';
  pageSizes = [10, 20, 50];
  rowSelection = 'single';
  columnDefs = [
    {headerName: 'Country Name', field: 'name', sortable: true},
    {headerName: 'Area', field: 'area', sortable: true},
    {headerName: 'Country Code', field: 'countryCode2', sortable: true}
  ];

  constructor(private countryService: CountryService, public router: Router) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getRequestParams(country: Country, page: number, rowsPerPage: number, asc: boolean, by: string): any {
    let params: any = {};

    if (country) {
      params = {
        ...(country.countryId &&
          {
            countryId: country.countryId
          }),
        ...(country.name &&
          {
            name: country.name
          }),
        ...(country.area &&
          {
            area: country.area
          }),
        ...(country.nationalDay &&
          {
            nationalDay: country.nationalDay
          }),
        ...(country.countryCode2 &&
          {
            countryCode2: country.countryCode2
          }),
        ...(country.countryCode3 &&
          {
            countryCode3: country.countryCode3
          }),
        ...(country.regionId &&
          {
            regionId: country.regionId
          }),
      }
    }

    if (page) {
      params[`page`] = page;
    }

    if (rowsPerPage) {
      params[`rowsPerPage`] = rowsPerPage;
    } else {
      params[`rowsPerPage`] = 20
    }

    if (asc !== null) {
      params[`asc`] = asc
    } else {
      params[`asc`] = false
    }

    if (by) {
      params[`by`] = by
    } else {
      params[`by`] = 'countryId'
    }

    return params;
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.gridApi.paginationSetPageSize(Number(this.pageSize))
  }

  getCountries(): void {
    const params = this.getRequestParams(this.selectedCountry, this.page, this.pageSize, this.asc, this.by);
    this.countryService.getAll(params)
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
    this.selectedCountry = {};
    this.currentIndex = -1;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onRowSelection(event: any) {
    this.router.navigate([`countries/${event.data.countryId}`]);
  }

}
