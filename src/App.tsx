import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchField from './components/SearchField';
import CountriesTable from './components/CountriesTable';

const pullData = async (url: string) => {
  const response = await fetch(url)
  const countriesData  = await response.json()
  return countriesData
}

const App = () : JSX.Element => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    pullData("https://restcountries.com/v3/all?fields=name,capital,population")
      .then(data => setCountriesData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <span className='heading'>Countries</span>
      <SearchField countries={countriesData} />
      <div className='tableInfo'><CountriesTable countries={countriesData}/></div>
    </div>
  );
}
export default App;
