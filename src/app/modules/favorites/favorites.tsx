import React, { useEffect, useState } from 'react';

import './favorites.scss'
import { getItems, getUser, removeItems } from '../../core/services/localstorage.services';
import { MapDateFilms } from '../../core/models/movie.models';
import Cart from '../../shared/UI/cart/cart';
import NavTitle from '../../shared/UI/title-cart/nav-title';
import { PATHNAMES } from '../../shared/consts/routes';
import Dialog from '../../shared/UI/dialog/dialog';
import { useNavigate } from 'react-router-dom';
import ConfirmationRemoveItem from '../../shared/UI/confirmationRemoveItem/confirmationRemoveItem';
import { useAppSelector } from '../../redux/store';
import { KEY_LOG_AUTH } from '../../redux/slices/logSlice';


const Favorites: React.FC = () => {
  const [items, setItems] = useState<MapDateFilms[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<MapDateFilms>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    const favorites = getItems(user?.uuid)?.favorites;
    if(!user) navigate(`/${PATHNAMES.sign_up}`);
    if (favorites) setItems(favorites);
	}, []);

  const onItem = (item: MapDateFilms) => {
    setItem(item);
    setOpen(true);
  };

  const Removefavorites = () => {
    const {uuid} = getUser();
    if (item?.kinopoiskId && uuid) {
      removeItems(item?.kinopoiskId, uuid);
      const deleteItem = [...items].filter(films => films.kinopoiskId !== item?.kinopoiskId);
      setItems(deleteItem);
    };
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} close={setOpen} style={{maxWidth: '320px'}}>
        <ConfirmationRemoveItem open={() => setOpen(false)}  remove={Removefavorites}/>
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
