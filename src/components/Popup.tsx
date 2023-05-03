import React from 'react'
import {Country } from './types/TableType';

const Popup= ({ country } : {country: Country}) : JSX.Element => {
    const { name, capital, population } = country;
  
    return (
      <div className="popup">
          <div className="popupInner">
            <h2>{name.common}</h2>
            <p><strong>Capital:</strong> {capital.join(', ')}</p>
            <p><strong>Population:</strong> {population}</p>
          </div>
      </div>
    );
  };

export default Popup