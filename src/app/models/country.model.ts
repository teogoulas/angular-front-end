import {LanguageModel} from "./language.model";
import {CountryStats} from "./country-stats.model";

export class Country {
  countryId?: number;
  name?: string;
  area?: number;
  nationalDay?: string;
  countryCode2?: string;
  countryCode3?: string;
  regionId?: number;
  languages?: LanguageModel[];
  countryStats?: CountryStats[];
}


