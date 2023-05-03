import React, {useState, useCallback} from 'react'
import Popup from './Popup';
import {CountriesData, Country } from './types/TableType';
import {SortKeys, SortOrder} from './types/SortTypes'
import Pagination from './Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKeys>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const changeCPage = (n: number) : void => {
    setCurrentPage(n);
  }

  const countriesPerPage : number = 10;
  const lastIndex = currentPage * countriesPerPage;
  const firstIndex = lastIndex - countriesPerPage;
  
  const npage = Math.ceil(countries.length / countriesPerPage);

  const sortedCountries = useCallback(
    () : CountriesData => sortData({tableData: countries, sortKey, reverse: sortOrder === 'desc'}),
     [countries, sortKey, sortOrder]
  );

  const sortCountries = sortedCountries();
  const records = sortCountries.slice(firstIndex, lastIndex);

  if (countries.length === 0) {
    return <div>Loading table</div>;
  }

  const countryProps = Object.keys(countries[0]);
  console.log(countryProps);
  // const countryProps = ['name', 'capital', 'population'];

  const selectCountry = (country: Country) : void => {
    setSelectedCountry(country);
  };

  const closePopup = () : void => {
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
          {records.map((country: Country) => (
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
      <Pagination currentPage={currentPage} npage={npage} changeCPage={changeCPage} />
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
