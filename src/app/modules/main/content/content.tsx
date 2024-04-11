import React from 'react';

import './content.scss'
import { MovieItem } from '../../../core/models/movie.models';
import Cart from '../../../shared/UI/cart/cart';

interface ContentProps {
  date?: MovieItem[];
}

const Content: React.FC<ContentProps> = ({date}) => {
  return (
    <div className='content'>
      <div className='content__view'>
        <div className='cart-container' >
          {date?.map((item) => (
            <Cart date={item} key={item.kinopoiskId}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Content;