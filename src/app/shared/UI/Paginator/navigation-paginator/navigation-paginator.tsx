import React, { useEffect, useState } from 'react';

import './navigation-paginator.scss'
import classNames from 'classnames';
import { usePaginatorUpdate } from '../../../../core/hooks/PaginatorUpdateHook';

interface NavigationPaginatorProps {
  totalPages: number,
  updatePage: (page: number) => void,
  page:number,
};

const NavigationPaginator: React.FC<NavigationPaginatorProps> = props => {
  const {totalPages, page, updatePage} = props;
  const {array} = usePaginatorUpdate(totalPages);
  const [extPrevious, setExtPrevious] = useState<boolean>(false);
  const [extNext, setExtNext] = useState<boolean>(true);
  const [update, setUpdate] = useState<number[]>([]);
  const checkTotal = totalPages > 13;
  const previous  = classNames('nav_ext', {isActive: extPrevious});
  const next = classNames('nav_ext', {isActive: extNext});

  const onPaginatorUpdate = (array: number[], currentPage: number, total:number): number[] => {
    const penultimateValue: number = array[array.length -1];
    const firstValue: number = array.findIndex(index => currentPage === index);
    const checkLat = total === penultimateValue + 1;
    let char = 4;
    let previous = 4;
    let count = currentPage + 9;
    let countPrevious = currentPage - 4;
    let start = 5;

    if (total < count) {
      char = total - currentPage -1;
    };

    if (countPrevious <= 0) {
      previous = currentPage - 2;
    };

    if (currentPage - 1 === previous) {
      return [...Array.from({length: 9}, (_, i) => ( i + 2))];
    }

    if (currentPage === 1) {
      return [...Array.from({length: 9}, (_, i) => ( i + 2))];
    }

    if (currentPage === total) {
     return [...Array.from({length: 9}, (_, i) => ((total -1) - i))].reverse()
    };
 
    
    if (currentPage === penultimateValue && !checkLat) {
      array.splice(0, char);
      return [...array, ...Array.from({length: char}, (_, i) => (i + currentPage + 1))];
    };
  
    if (0 === firstValue && array[0] - 1 !== 1) {
      array.splice(start, previous);
      return [...Array.from({length: previous}, (_, i) => currentPage - (i + 1)).reverse(), ...array]
    };

    return [...array];
  };

  useEffect(() => {
    if (totalPages > 13 && !!update.length) {
      const upDate = onPaginatorUpdate(update, page, totalPages);
      setUpdate(upDate);
     
      if (totalPages - 1 === upDate.at(-1)) {
        setExtNext(false);
        setExtPrevious(true);
      } else setExtPrevious(true);

      if (upDate[0] === 2) {
        setExtPrevious(false);
      };

    };

    if (!update.length) setUpdate(array);

  },[array, page]);

  const onSetActive = (currentPage: number) => {
    return classNames('btn-paginator', {isActive: page === currentPage})
  };
  
  const handleChangePage = (currentPage: number) => {
    const findIndex = update.findIndex(item => currentPage === item);
    if (currentPage === 1) {
        setExtNext(true);
        setExtPrevious(false);
    }
    
    if (currentPage === totalPages) {
      setExtNext(false);
      setExtPrevious(true);
    };

    if (findIndex === 0) {
      setExtNext(true);
    };

    updatePage(currentPage);
  };

  return (
    <>
    <button
        className={onSetActive(1)}
        onClick={() => handleChangePage(1)}
      >
        1
      </button>
      {checkTotal && <span className={previous}>...</span>}
      {update.map((item, i) => (
				<button 
          className={onSetActive(item)}
          key={i} 
          onClick={() => handleChangePage(item)}
        >{item}</button>
			))}
        {checkTotal && <span className={next}>...</span>}
        <button
        className={onSetActive(totalPages)}
        onClick={() => handleChangePage(totalPages)}
      >
        {totalPages}
      </button>
    </>
  )
}

export default NavigationPaginator;