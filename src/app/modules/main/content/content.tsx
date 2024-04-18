import React from 'react';

import './content.scss'
import { MapDateFilms } from '../../../core/models/movie.models';
import Cart from '../../../shared/UI/cart/cart';
import { PATHNAMES } from '../../../shared/consts/routes';
import NavTitle from '../../../shared/UI/title-cart/nav-title';
import Button from '../../../shared/UI/button/button';

interface ContentProps {
  date: MapDateFilms[];
}

const Content: React.FC<ContentProps> = ({date}) => {

  const onAddCart = (item: MapDateFilms) => {
    console.log(item);
  };

  return (
    <div className='content'>
      <div className='content__view'>
        <div className='cart-container' >
          {date?.map((item) => (
            <Cart 
              date={item} 
              key={item.kinopoiskId}
              titleElement={
              <NavTitle 
                className={'title'} 
                link={`${PATHNAMES.film}/${item.kinopoiskId}`} 
                title={item.nameRu}
              />
              }
              buttonElement={
              <Button 
                title={'Add to favorites'} 
                className={'green'}
                onClick={() => onAddCart(item)}
                style={{maxWidth: '200px', padding: '0.6rem 0'}}
              />
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Content;