type Name = {
    common: string,
  }
  
  export type CountriesData = Country[];
  
  export interface Country {
    name: Name;
    capital: string[];
    population: number;
  }
  