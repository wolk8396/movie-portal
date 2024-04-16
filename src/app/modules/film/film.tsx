import React from 'react';

import './film.scss'
import { useParams } from 'react-router-dom';
import { useMapDate } from '../../core/hooks/mapDateHooks';
import { movieApi } from '../../core/services/movi.services';
import Cart from '../../shared/UI/cart/cart';

const Film: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const {isSuccess, data} = movieApi.useGetMovieDescriptionQuery({id: id});
  const {dateFilm} = useMapDate(data, isSuccess);

  return (
    <>
     {!!dateFilm.length && 
      <Cart date={dateFilm[0]}>
        {<span className='title'>{dateFilm[0].nameRu}</span>}
      </Cart>
     }
    </>
  )
}

export default Film;