import React from 'react';

import './content.scss'
import { MapDateFilms, MovieItem } from '../../../core/models/movie.models';
import Cart from '../../../shared/UI/cart/cart';
import { NavLink } from 'react-router-dom';
import { PATHNAMES } from '../../../shared/consts/routes';

interface ContentProps {
  date: MapDateFilms[];
}

const Content: React.FC<ContentProps> = ({date}) => {
  return (
    <div className='content'>
      <div className='content__view'>
        <div className='cart-container' >
          {date?.map((item) => (
            <Cart date={item} key={item.kinopoiskId}>
             {<NavLink className='title' to={`${PATHNAMES.film}/${item.kinopoiskId}`}>
                {item.nameRu}
              </NavLink>}
            </Cart>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Content;