import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import {Router} from "@angular/router";
import {getRequestParams} from "../../services/utils";

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

  createParamMap(country: Country, page: number, rowsPerPage: number, asc: boolean, by: string): any {
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

    return getRequestParams(params, page, rowsPerPage, asc, by);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.gridApi.paginationSetPageSize(Number(this.pageSize))
  }

  getCountries(): void {
    const params = this.createParamMap(this.selectedCountry, this.page, this.pageSize, this.asc, this.by);
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
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onRowSelection(event: any) {
    this.router.navigate([`countries/${event.data.countryId}`]);
  }

}
