import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchField from './components/SearchField';
import CountriesTable from './components/CountriesTable';

const pullData = async (url: string) => {
  const response = await fetch(url)
  const countriesData  = await response.json()
  return countriesData
}

const App: React.FC = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage : number = 10;
  const lastIndex = currentPage * countriesPerPage;
  const firstIndex = lastIndex - countriesPerPage;
  const records = countriesData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(countriesData.length / countriesPerPage);
  const numbers = [currentPage];
  if ((currentPage - 1) > 0) numbers.unshift(currentPage - 1);

  if ((currentPage + 1) <= npage) numbers.push(currentPage + 1);
  // else numbers.unshift(currentPage - 2)

  // if(currentPage === 1) numbers.push(3)

  useEffect(() => {
    pullData("https://restcountries.com/v3/all?fields=name,capital,population")
      .then(data => setCountriesData(data))
      .catch(error => console.log(error));
  }, []);

  const firstPage = () => {
    setCurrentPage(1)
  }
  const prePage = () => {
    if(currentPage !== 1 ) setCurrentPage(currentPage - 1);
  }
  const changeCPage = (n:number) => {
    setCurrentPage(n);
  }
  
  const nextPage = () => {
    if(currentPage !== npage ) setCurrentPage(currentPage + 1);
  }

  const lastPage = () => {
    setCurrentPage(npage)
  }
  return (
    <div className="App">
      <span className='heading'>Countries</span>
      <SearchField />
      <div className='tableInfo'><CountriesTable countries={records}/></div>
      <nav>
        <ul className='pagination'>
            <li className='page-item'>
              <button className='page-link' onClick={firstPage} disabled = {currentPage === 1}>First</button>
            </li>
            <li className='page-item'>
              <button className='page-link' onClick={prePage} disabled = {currentPage === 1}>Prev</button>
            </li>
            {
              numbers.map((n,i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <button className='page-link' onClick={() => changeCPage(n)} disabled = {(n === npage && currentPage === n  ) || (n === 1 && currentPage === n)}>
                    {n}
                  </button>
                </li>
              ))
            }
            <li className='page-item'>
              <button className='page-link' onClick={nextPage} disabled = {currentPage === npage}>Next</button>
            </li>
            <li className='page-item'>
              <button className='page-link' onClick={lastPage} disabled = {currentPage === npage}>Last</button>
            </li>
        </ul>
      </nav>
    </div>
  );
}
export default App;
