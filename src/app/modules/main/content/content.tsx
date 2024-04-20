import React, { useEffect, useRef, useState } from 'react';

import './content.scss'
import { MapDateFilms } from '../../../core/models/movie.models';
import Cart from '../../../shared/UI/cart/cart';
import { PATHNAMES } from '../../../shared/consts/routes';
import NavTitle from '../../../shared/UI/title-cart/nav-title';
import Button from '../../../shared/UI/button/button';
import Dialog from '../../../shared/UI/dialog/dialog';
import { getItems, removeItems, setItems } from '../../../core/services/localstorage.services';
import Confirmation from '../../../shared/UI/confirmation/confirmation';
import { deleteFavoritesText } from '../../../shared/consts/messages';

interface ContentProps {
  date: MapDateFilms[];
}

const Content: React.FC<ContentProps> = ({date}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [update, setUpdate] =  useState<MapDateFilms[]>(date);
  const [item, setItem] = useState<MapDateFilms>();
  const [message, setMessage] = useState<string>(deleteFavoritesText);
 
  const onAddCart = (item: MapDateFilms) => {
    const findItem =  getItems().find(film => film.kinopoiskId === item.kinopoiskId);
    setItem(item);
    findItem ? setOpen(true) : setItems(item);
    const setFavorites = [...update].map(film => ({...film, favorites: item.kinopoiskId === item.id}));
    setUpdate(setFavorites);
  };

  const onFindId = (id: number): boolean  => {
    const isId = getItems().find(film => film.kinopoiskId === id)?.kinopoiskId;
    if (typeof isId !== 'undefined') {
      return id === isId;
    } 
    return false
  }

  const Removefavorites = () => {
    const findItem =  getItems().find(film => film.kinopoiskId === item?.kinopoiskId);
    if (findItem) removeItems(findItem);
    setOpen(false);
  }

  useEffect(() => {
    if (!!date.length) {
      setUpdate(date)
    }
  }, [date])

  return (
    <>
    <Dialog open={open} close={setOpen} style={{maxWidth: '320px'}}>
      <Confirmation messages={message}>
        <Button 
          title={'Close'} 
          className={'pink'}
          onClick={() => setOpen(false)}
          style={{maxWidth: '100px', padding: '0.4rem 0'}}
        />
        <Button 
          title={'Ok'} 
          className={'pink'}
          onClick={() => Removefavorites()}
          style={{maxWidth: '100px', padding: '0.6rem 0'}}
        />
      </Confirmation>
    </Dialog>
    <div className='content'>
      <div className='content__view'>
        <div className='cart-container' >
          {update?.map((item) => (
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
            >
              <Button 
                title={!onFindId(item.kinopoiskId) || item.favorites ? 'Add to favorites': "Remove from favorites"} 
                className={!onFindId(item.kinopoiskId) || item.favorites ? 'green' : 'pink'}
                onClick={() => onAddCart(item)}
                style={{maxWidth: '210px', padding: '0.6rem 0'}}
              />
            </Cart>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Content;