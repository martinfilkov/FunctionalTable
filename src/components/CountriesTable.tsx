import React, {useState} from 'react'
import Popup from './Popup';
//pogledni kak dyrpash ot apito
type Name = {
  common: string,
}

interface Country {
  name: Name;
  capital: string[];
  population: number;
}

const CountriesTable= ({ countries } : {countries: Country[]}) : JSX.Element => {
  console.log('countries:', countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  if (countries.length === 0) {
    return <div>Loading table</div>;
  }

  const countryProps = Object.keys(countries[0]);
  
  // const countryProps = ['name', 'capital', 'population'];

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const closePopup = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="countries-table">
      <table>
        <thead>
          <tr>
            {countryProps.map((header: string) => (
              <th key={header}>
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((country: Country) => (
            <tr key={country.name.common} onClick={() => selectCountry(country)}>
              {countryProps.map((header: string) => (
                <td key={`${country.name.common}-${header}`.toLowerCase()}>
                  {
                    header === 'name'
                      ? country.name.common
                      : header === 'capital'
                      ? country.capital.join(' ')
                      : country.population
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCountry &&
        <div className="popup-wrapper">
          <div className="overlay" onClick={closePopup}></div>
          <Popup country={selectedCountry} />
        </div>
      }
    </div>
  );
};

export default CountriesTable;
