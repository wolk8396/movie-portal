import React, { useEffect, useState } from 'react';

import './main.scss'
import Paginator from '../../shared/UI/Paginator/Paginator';
import { movieApi } from '../../core/services/movi.services';
import Content from './content/content';
import { Movie } from '../../shared/consts/moky';
import { useWindowResize } from '../../core/hooks/useWindowResize';
import { useMapDate } from '../../core/hooks/mapDateHooks';

const Main: React.FC = () => {
  const {screenHeight} = useWindowResize();
  const [page, setPage] = useState<number>(1)
  const {isSuccess, data} = movieApi.useGetCollectionsMovieQuery({type:'TOP_POPULAR_ALL', page:page});
  const {dateFilm} = useMapDate(data?.items, true)
  const [totalPages, setTotalPages] = useState<number>(0);
 
 const onPageChange = (page: number) => {
    setPage(page);

 };

 useEffect(() => {
  if (typeof data !== 'undefined' && isSuccess) {
    setTotalPages(data.totalPages);
    // setTotalPages(35);
  };

 }, [page, data])

//  useEffect(() => {
//   setTotalPages(35);
//  }, [])


  return (
    <div className='wrapper-main' style={{height: `${screenHeight - 140}px`}}>
      <Content date={dateFilm}/>
      <div className='footer'>
        <Paginator 
          totalPages={totalPages} 
          onPageChange={(page) => onPageChange(page)}
        />
      </div>
    </div>
  )
}

export default Main;
