import React, { useEffect, useState } from 'react';

import './favorites.scss'
import { getItems, getUser, removeItems } from '../../core/services/localstorage.services';
import { MapDateFilms } from '../../core/models/movie.models';
import Cart from '../../shared/UI/cart/cart';
import NavTitle from '../../shared/UI/title-cart/nav-title';
import { PATHNAMES } from '../../shared/consts/routes';
import Button from '../../shared/UI/button/button';
import Confirmation from '../../shared/UI/confirmation/confirmation';
import Dialog from '../../shared/UI/dialog/dialog';
import { deleteFavoritesText } from '../../shared/consts/messages';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const [items, setItems] = useState<MapDateFilms[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<MapDateFilms>();
  const navigate = useNavigate();

  useEffect(() => {
   const authUser =  getUser();
   if(!authUser) navigate('/');
	}, []);

  const onItem = (item: MapDateFilms) => {
    setItem(item);
    setOpen(true);
  };

  const Removefavorites = () => {
    const findItem =  getItems().find(film => film.kinopoiskId === item?.kinopoiskId);
    const deleteItem = [...items].filter(films => films.kinopoiskId !== item?.kinopoiskId);
    if (findItem) {
      setItems(deleteItem);
      removeItems(findItem);
    };
    setOpen(false);
  }

  useEffect(() => {
   const cart = getItems();
   setItems(cart);
  }, [])

  return (
    <>
      <Dialog open={open} close={setOpen} style={{maxWidth: '320px'}}>
      <Confirmation messages={deleteFavoritesText}>
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
    <div className='wrapper-favorites'>
      {items?.map((item) => (
        <Cart 
          date={item} 
          key={item.kinopoiskId}
          closeBtn={true}
          onDeleteCart={() => onItem(item)}
          titleElement={
          <NavTitle 
            className={'title'} 
            link={`/${PATHNAMES.film}/${item.kinopoiskId}`} 
            title={item.nameRu}
          />
          }
        />
      ))}
    </div>
    </>
    
  )
}

export default Favorites;