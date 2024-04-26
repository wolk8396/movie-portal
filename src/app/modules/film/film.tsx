import React, { useEffect, useState } from 'react';

import './film.scss'
import { useParams } from 'react-router-dom';
import { useMapDate } from '../../core/hooks/mapDateHooks';
import { movieApi } from '../../core/services/movi.services';
import Cart from '../../shared/UI/cart/cart';
import Title from '../../shared/UI/title-cart/title';
import Button from '../../shared/UI/button/button';
import { getItems, getUser, removeItems, setItems } from '../../core/services/localstorage.services';
import Dialog from '../../shared/UI/dialog/dialog';
import ConfirmationRemoveItem from '../../shared/UI/confirmationRemoveItem/confirmationRemoveItem';
import ConfirmationLogIn from '../../shared/UI/confirmation-LogIn/Confirmation-logIn';
import { MapDateFilms } from '../../core/models/movie.models';
import { useAppSelector } from '../../redux/store';
import { KEY_LOG_AUTH } from '../../redux/slices/logSlice';

const Film: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const {isSuccess, data} = movieApi.useGetMovieDescriptionQuery({id: id});
  const {dateFilm} = useMapDate(data, isSuccess);
  const [uid, setUid] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<MapDateFilms>();
  const {logOut} = useAppSelector(state => state[KEY_LOG_AUTH]);

  const onFindFilm = (id: number) => {
    const items = getItems(uid);
    return items?.favorites.find(film => film.kinopoiskId === id);
  };

  const onAddCart = () => {
    if (uid && item) {
      const cloneItem = {...item};
      const findItem = onFindFilm(cloneItem.kinopoiskId);
      findItem ? setOpen(true) : setItems(item, uid);
      if (!findItem) {
        cloneItem.favorites = !item.favorites ? true: false;
        setItem(cloneItem);
      }
    }else setOpen(true);
  }

  const RemoveFavorites = () => {
    if (item?.kinopoiskId && uid) {
      const cloneItem = {...item};
      removeItems(cloneItem?.kinopoiskId, uid);
      cloneItem.favorites = false;
      setItem(cloneItem);
    };
    setOpen(false);
  }

  useEffect(() => {
    const users = getUser();
    users && users.uuid ? setUid(users.uuid) : setUid(null);
    if (dateFilm[0]?.kinopoiskId && onFindFilm(dateFilm[0]?.kinopoiskId)) {
      dateFilm[0].favorites = true;
    }
    setItem(dateFilm[0]);
  }, [dateFilm]);

  useEffect(() => {
    if (logOut && item?.favorites) {
      const cloneItem = {...item};
      cloneItem.favorites = false;
      setUid(null);
      setItem(cloneItem);
    }

  }, [logOut])

  return (
    <>
      <Dialog open={open} close={setOpen} style={{maxWidth: '320px'}}>
        {uid ? 
          ( 
          <ConfirmationRemoveItem open={() => setOpen(false)}  remove={RemoveFavorites}/>
          ) : <ConfirmationLogIn/>
        }
      </Dialog>
      <div className='wrapper-film'>
      {!!item && 
        <Cart date={item} 
          description={true}
          titleElement={
            <Title className={'title'} title={dateFilm[0].nameRu}/>
          }
        >
          <Button 
            title={!item.favorites ? 'Add to favorites': "Remove from favorites"} 
            className={!item.favorites ? 'green' : 'pink'}
            onClick={onAddCart}
            style={{maxWidth: '410px', padding: '0.6rem 0'}}
          /> 
        </Cart>
      }
      </div>
    </>
  )
}

export default Film;