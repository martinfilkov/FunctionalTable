import React, { useState } from 'react'
import Popup from './Popup';
import {CountriesData, Country } from './types/TableType';

const SearchField = ({ countries } : {countries: CountriesData}) => {
  const [countryName, setCountryState] = useState('');
  const [filteredCountries, setFilteredState] = useState<CountriesData>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); 

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    setCountryState(event.target.value);
    onSearch((event.target.value).toLowerCase());
  }

  const onSearch = (searchedCountry: string) : void => {
    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchedCountry)
    });
    setFilteredState(filteredCountries);
  }

  const onSelect = (selectedCountry: Country) : void => {
    setFilteredState([]);
    setCountryState('');
    setSelectedCountry(selectedCountry);
  }

  const closePopup = () : void => {
    setSelectedCountry(null);
  };

  return(
    <div className='input-container'>
      <input type="text" placeholder='Search a country' className='input_field' value={countryName} onChange={onChange}/>
      {filteredCountries.length > 0 && (
      <ul className='list-filtered-countries'>
        {
          filteredCountries.slice(0,10).map((country: Country) =>(
            <li key={country.name.common} className='suggested-country' onClick={() => onSelect(country)}>
                {country.name.common}
            </li>
          ))}
      </ul>
      )}
      {selectedCountry &&
        <div className="popup-wrapper">
          <div className="overlay" onClick={closePopup}></div>
          <Popup country={selectedCountry} />
        </div>
      }
    </div>
  );
}

export default SearchField