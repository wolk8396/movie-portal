import { FormDataModel } from "../models/FormData.models";
import { MapDateFilms } from "../models/movie.models";

const getItems = (): MapDateFilms[] => {
  return JSON.parse(localStorage.getItem('films') || '[]');
}

const getUser = (): FormDataModel => {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

const setUsers = (user: FormDataModel): void => {
  localStorage.setItem('user', JSON.stringify(user));
}

const setItems = (items: MapDateFilms): void => {
  const films = getItems();
  const addFilms = [...films, items];
  localStorage.setItem('films', JSON.stringify(addFilms));
};

const removeItems = (items: MapDateFilms): void => {
  const films = getItems().filter(film => film.kinopoiskId !== items.kinopoiskId);
  localStorage.setItem('films', JSON.stringify(films));
};

export {setItems, removeItems, getItems, setUsers, getUser};