import React from 'react';

import './cart.scss'
import { MapDateFilms } from '../../../core/models/movie.models';
import Images from '../image/image';
import SkeletonImage from '../skeleton-image/skeleton-image';

interface CartProps {
  date: MapDateFilms,
  children: React.ReactNode;
}

const Cart: React.FC<CartProps> = ({date, children}) => {
  return (
    <div className='short-story'>
      <div className='short-story__header'>
       {children}
      </div>
      <div className='short-story__main'>
        <div className='poster'>
        <Images src={date.posterUrl} alt={''} >
          <SkeletonImage/>
        </Images>
          {/* <LazyLoadImg src={date.posterUrl} alt={''} ratio={0} /> */}
        </div>
        <div className='info'>
          <span className='info__title'>{date.nameRu}</span>
          <span className='info__item'>
            <strong>Год выпуска: </strong>
            {date.year}
          </span>
          <span className='info__item'><strong>Страна:</strong> {date.countries}</span>
          <span className='info__item'><strong>Жанр:</strong> {date.genres}</span>
        </div>
      </div>
      <span className='short-story__description'>{date.description}</span>
    </div>
  )
}

export default Cart;