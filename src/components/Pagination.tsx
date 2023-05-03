import React from 'react';

type PaginationType = {
  currentPage: number,
  npage: number,
  changeCPage: (n: number) => void,
};

const Pagination = ({ currentPage, npage, changeCPage }: PaginationType) : JSX.Element => {
  const numbers = [currentPage];

  if ((currentPage - 1) > 0) numbers.unshift(currentPage - 1);

  if ((currentPage + 1) <= npage) numbers.push(currentPage + 1);
  else numbers.unshift(currentPage - 2)

  if(currentPage === 1) numbers.push(3)

  return (
    <ul className='pagination'>
      <li className='page-item'>
        <button className='page-link' onClick={() => changeCPage(1)} disabled={currentPage === 1}>First</button>
      </li>
      <li className='page-item'>
        <button className='page-link' onClick={() => changeCPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      </li>
      {
        numbers.map((n,i) => (
          <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
            <button className='page-link' onClick={() => changeCPage(n)} disabled={((n === npage && currentPage === n) || (n === 1 && currentPage === n)) || currentPage === n}>
              {n}
            </button>
          </li>
        ))
      }
      <li className='page-item'>
        <button className='page-link' onClick={() => changeCPage(currentPage + 1)} disabled={currentPage === npage}>Next</button>
      </li>
      <li className='page-item'>
        <button className='page-link' onClick={() => changeCPage(npage)} disabled={currentPage === npage}>Last</button>
      </li>
    </ul>
  );
};

export default Pagination;
