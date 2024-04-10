// /* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import './paginator.scss'
import NavigationPaginator from './navigation-paginator/navigation-paginator';

interface PaginatorProps {
  totalPages: number,
  onPageChange: (num: number) => void
}

const Paginator = ({ totalPages, onPageChange }: PaginatorProps) => {
  const [array, setArray] = useState<number[]>([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [page, setPage] = useState<number>(1);
  
  const onIncrease = () => {
    let value = page
    if (page !== totalPages) {
      value += 1;
      setPage(value);
      onPageChange(value);
    }
  }

  const onDecrease = () => {
    let value = page
    if (page > 1) {
      value -= 1;
      onPageChange(value);
      setPage(value);
    }
  };

  const onUpdate = (page: number) => {
    onPageChange(page);
    setPage(page);
  };

  return (
    <div className='paginator'>
      <button
        className='paginator__bot-navigation'
        onClick={onDecrease}
      >
        Previous
      </button>
      <NavigationPaginator 
        insertNumbers={array} 
        totalPages={totalPages}
        page={page}
        updatePage={(page: number) => onUpdate(page)}
      />
      <button
        className='paginator__bot-navigation'
        onClick={onIncrease}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;