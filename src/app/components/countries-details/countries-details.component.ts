import { Component, OnInit } from '@angular/core';
import {Country} from "../../models/country.model";
import {CountryService} from "../../services/country.service";
import {Router} from "@angular/router";
import {getRequestParams, range} from "../../services/utils";
import {Region} from "../../models/region.model";

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.scss']
})
export class CountriesDetailsComponent implements OnInit {

  dropdownSettings: any;
  gridApi: any;
  countries: Country[] = [];
  regions: Region[] = [];
  regionName = null;
  yearFrom = null;
  yearTo = null;
  currentIndex = -1;
  page = -1;
  count = 0;
  pageSize = 10;
  asc = false;
  by = 'countryId';
  pageSizes = [10, 20, 50];
  rowSelection = 'single';
  years = range(1970, new Date().getFullYear())
  columnDefs = [
    {headerName: 'Country Name', field: 'name', sortable: true},
    {headerName: 'Year', valueGetter: this.getYear, sortable: true},
    {headerName: 'Population', valueGetter: this.getPopulation, sortable: true},
    {headerName: 'GDP', valueGetter: this.getGdp, sortable: true},
    {headerName: 'Region Name', field: 'regionName', sortable: true},
    {headerName: 'Continent Name', field: 'continentName', sortable: true}
  ];

  constructor(private countryService: CountryService, public router: Router) { }

  ngOnInit(): void {
    this.initDropdownSettings();
    this.getRegions();
    this.getCountriesDetails();
  }

  createParamMap(regionName: any, yearFrom: any, yearTo: any, page: number, rowsPerPage: number, asc: boolean, by: string): any {
    let params = {
      ...(regionName &&
        {
          regionName: regionName
        }),
      ...(yearFrom &&
        {
          yearFrom: yearFrom
        }),
      ...(yearTo &&
        {
          yearTo: yearTo
        })
    };

    return getRequestParams(params, page, rowsPerPage, asc, by);
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

  getCountriesDetails(): void {
    const params = this.createParamMap(this.regionName, this.yearFrom, this.yearTo, this.page, this.pageSize, this.asc, this.by);
    this.countryService.getDetails(params)
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

  getRegions(): void {
    const params = getRequestParams({}, this.page, this.pageSize, this.asc, this.by);
    this.countryService.getRegions(params)
      .subscribe(
        response => {
          this.regions = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.getCountriesDetails();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  initDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'regionId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight : '100'
    };
  }

  onRegionSelect(event: any) {
    this.regionName = event.name
  }

  onYearFromSelect(event: any) {
    this.yearFrom = event
  }

  onYearToSelect(event: any) {
    this.yearTo = event
  }

  onRegionDeSelect() {
    this.regionName = null
  }

  onYearFromDeSelect() {
    this.yearFrom = null
  }

  onYearToDeSelect() {
    this.yearTo = null
  }

  search() {
    this.getCountriesDetails()
  }

}
