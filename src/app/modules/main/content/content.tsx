import React, { useEffect, useState } from 'react';

import './content.scss';

import { MapDateFilms } from '../../../core/models/movie.models';
import Cart from '../../../shared/UI/cart/cart';
import { PATHNAMES } from '../../../shared/consts/routes';
import NavTitle from '../../../shared/UI/title-cart/nav-title';
import Button from '../../../shared/UI/button/button';
import Dialog from '../../../shared/UI/dialog/dialog';
import { getItems, getUser, removeItems, setItems } from '../../../core/services/localstorage.services';
import ConfirmationRemoveItem from '../../../shared/UI/confirmationRemoveItem/confirmationRemoveItem';
import ConfirmationLogIn from '../../../shared/UI/confirmation-LogIn/Confirmation-logIn';
import { useAppSelector } from '../../../redux/store';
import { KEY_LOG_AUTH } from '../../../redux/slices/logSlice';

interface ContentProps {
  date: MapDateFilms[];
}

const Content: React.FC<ContentProps> = ({date}) => {
  const {logOut} = useAppSelector(state => state[KEY_LOG_AUTH]);
  const [open, setOpen] = useState<boolean>(false);
  const [update, setUpdate] =  useState<MapDateFilms[]>(date);
  const [item, setItem] = useState<MapDateFilms>();
  const [uid, setUid] = useState<string | null>(null);

  const onUpdate = (item: MapDateFilms, value: boolean) => {
    const updateItems = [...update].map(items => {
      return {
        ...items,
        favorites: item.kinopoiskId === items.kinopoiskId ? value: items.favorites
      }
    });
    setUpdate(updateItems);
  }
 
  const onAddCart = (item: MapDateFilms) => {
    if (uid) {
      const items = getItems(uid);
      const findItem =  items?.favorites.find(film => film.kinopoiskId === item.kinopoiskId);
      findItem ? setOpen(true) : setItems(item, uid);
      !findItem ? onUpdate(item, true) : setItem(item);
    } else setOpen(true);
  };

  const Removefavorites = () => {
    if (item?.kinopoiskId && uid) {
      removeItems(item?.kinopoiskId, uid);
      onUpdate(item, false);
    };
    setOpen(false);
  }

  const getIdFilms = (date: MapDateFilms[]) => {
    if (uid) {
      const items = getItems(uid);
      const ids = items?.favorites.reduce((acc: number[], item) => {
        acc.push(item.kinopoiskId)
        return acc;
      }, []);
  
      const update = [...date].map(item => {
        return {
          ...item,
          favorites: ids?.includes(item.kinopoiskId)
        }
      });
      setUpdate(update);
    }else  setUpdate(date);
  }

  useEffect(() => {
    const users = getUser();
    users && users.uuid ? setUid(users.uuid) : setUid(null);
    if (!!date.length) getIdFilms(date);
  }, [date]);

  useEffect(() => {
    if (logOut) {
      const updateItems = [...update].map(items =>({...items, favorites: false}));
      setUpdate(updateItems);
      setUid(null);
    }
  }, [logOut]);

  return (
    <>
    <Dialog open={open} close={setOpen} style={{maxWidth: '320px'}}>
      {uid ? 
        ( 
        <ConfirmationRemoveItem open={() => setOpen(false)}  remove={Removefavorites}/>
        ) : <ConfirmationLogIn/>
      }
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
                title={!item.favorites ? 'Add to favorites': "Remove from favorites"} 
                className={!item.favorites ? 'green' : 'pink'}
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