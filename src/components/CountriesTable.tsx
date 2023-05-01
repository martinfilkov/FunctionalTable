import React, {useState, useCallback} from 'react'
import Popup from './Popup';
//pogledni kak dyrpash ot apito
type Name = {
  common: string,
}

type SortKeys = keyof Country;

type CountriesData = Country[];

type SortOrder = 'asc' | 'desc';

interface Country {
  name: Name;
  capital: string[];
  population: number;
}

function sortData({tableData, sortKey, reverse} : {
  tableData: CountriesData,
  sortKey: SortKeys,
  reverse: boolean
  }) {
  if(!sortKey) return tableData;
  
  const sortedCountries = tableData.sort((a, b) =>{
    if (sortKey === "name") {
      return a.name.common.localeCompare(b.name.common);
    }
    else return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  console.log('sortedData', sortedCountries)
  if(reverse) return sortedCountries.reverse()

  return sortedCountries;
}

const CountriesTable= ({ countries } : {countries: CountriesData}) : JSX.Element => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [sortKey, setSortKey] = useState<SortKeys>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const sortedCountries = useCallback(
    () => sortData({tableData: countries, sortKey, reverse: sortOrder === 'desc'}),
     [countries, sortKey, sortOrder]
  );


  if (countries.length === 0) {
    return <div>Loading table</div>;
  }

  const countryProps = Object.keys(countries[0]);
  console.log(countryProps);
  // const countryProps = ['name', 'capital', 'population'];

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  const closePopup = () => {
    setSelectedCountry(null);
  };

  const changeSort = (newSortKey: SortKeys) => {
    if (newSortKey === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(newSortKey);
      setSortOrder('asc');
    }
  };

  return (
    <div className="countries-table">
      <table>
        <thead>
          <tr>
            {countryProps.map((header: string) => (
              <th key={header} onClick={() => changeSort(header as SortKeys)}>
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCountries().map((country: Country) => (
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
