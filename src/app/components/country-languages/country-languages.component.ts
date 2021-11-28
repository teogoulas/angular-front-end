import { Component, OnInit } from '@angular/core';
import {Country} from "../../models/country.model";
import {CountryService} from "../../services/country.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-country-languages',
  templateUrl: './country-languages.component.html',
  styleUrls: ['./country-languages.component.scss']
})
export class CountryLanguagesComponent implements OnInit {
  currentCountry: Country = {
    countryId: -1,
    name: '',
    area: -1,
    nationalDay: '',
    countryCode2: '',
    countryCode3: '',
    regionId: -1,
    languages: [],
  };
  columnDefs = [
    {headerName: 'Language Id', field: 'languageId', sortable: true},
    {headerName: 'Language Name', field: 'language', sortable: true}
  ];

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTutorial(this.route.snapshot.params["id"]);
  }

  getTutorial(id: string): void {
    this.countryService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCountry = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
