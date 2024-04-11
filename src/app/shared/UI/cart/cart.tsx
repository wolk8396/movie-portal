import React from 'react';

import './cart.scss'
import { Country, Genre, MovieItem } from '../../../core/models/movie.models';

interface CartProps {
  date: MovieItem
}

const Cart: React.FC<CartProps> = ({date}) => {

  const mapCountries = (countries: Country[]): string => {
    const array = countries.map(item => item.country)
    return array.length > 1 ? array.join('/') : array.join('')
  };

  const mapGenres = (genres: Genre[]): string => {
    const array = genres.map(item => item.genre)
    return array.length > 1 ? array.join('/') : array.join('')
  }

  return (
    <div className='short-story'>
      <div className='short-story__header'>
        <span className='title'>{date.nameRu}</span>
      </div>
      <div className='short-story__main'>
        <div className='poster'>
          <img className='poster-photos' src={date.posterUrl} alt="" />
        </div>
        <div className='info'>
          <span className='info__title'>{date.nameRu}</span>
          <span className='info__item'>
            <strong>Год выпуска: </strong>
            {date.year}
          </span>
          <span className='info__item'><strong>Страна:</strong> {mapCountries(date.countries)}</span>
          <span className='info__item'><strong>Жанр:</strong> { mapGenres(date.genres)}</span>
        </div>
      </div>
    </div>
  )
}

export default Cart;