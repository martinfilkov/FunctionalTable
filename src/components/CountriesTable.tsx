// import { table } from 'console';
import React from 'react'
//pogledni kak dyrpash ot apito
type Name = {
  common: string,
}

interface Country {
  name: Name;
  capital: string[];
  population: number;
}
   
 interface Props {
    countries: Country[];
  };

  const CountriesTable: React.FC<Props> = ({ countries }) => {
    const countryProps = ['name', 'capital', 'population'];
    return (
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
          <tr key={country.name.common}>
            {countryProps.map((header: string) => (
              <td key={`${country.name.common}`.toLowerCase()}>
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

    );
  };
export default CountriesTable