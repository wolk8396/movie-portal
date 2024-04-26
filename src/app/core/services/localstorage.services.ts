import { FavoritesModels } from "../models/Favorites.models";
import { FormDataModel } from "../models/FormData.models";
import { MapDateFilms } from "../models/movie.models";

const getItems = (uid: string | null | undefined): FavoritesModels | null   => {
  const films: FavoritesModels[] = JSON.parse(localStorage.getItem('films') || '[]');
  if (uid) {
    const filmsUser = films.find(item => item.uuid === uid);
    return filmsUser ? filmsUser : null;
  }
 
  return null;
}

const getUser = (): FormDataModel => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};

const setUsers = (user: FormDataModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

const LogOutAuth = () => {
  localStorage.removeItem('user');
};

const setItems = (items: MapDateFilms, uid: string): void => {
  const films: FavoritesModels[] = JSON.parse(localStorage.getItem('films') || '[]');
  const find = films.find(item => item.uuid === uid)
  let date: FavoritesModels[] = [];
 
  if (!films.length || !find) {
    date = [...films, {uuid: uid, favorites:[items]}]
  } else {
    date = films.map(films => {
      const addItem = uid === films.uuid ? [...films.favorites, items] : films.favorites;
      return {
        ...films,
        favorites: addItem,
      }
    })
  }
  localStorage.setItem('films', JSON.stringify(date));
};

const removeItems = (id: number, uid: string): void => {
  const films: FavoritesModels[] = JSON.parse(localStorage.getItem('films') || '[]');
  const filmsUser = films.find(item => item.uuid === uid);
  if (filmsUser) {
    const update: MapDateFilms[] = filmsUser.favorites.filter(item => {
      return item.kinopoiskId !== id;
    });

    const updateList:FavoritesModels[] = films.map(item => {
      const updateItem = uid === item.uuid ? update : item.favorites;
      return {
        uuid: item.uuid,
        favorites:updateItem,
      }
    });
    localStorage.setItem('films', JSON.stringify(updateList));
  }
};

export {setItems, removeItems, getItems, setUsers, getUser, LogOutAuth};