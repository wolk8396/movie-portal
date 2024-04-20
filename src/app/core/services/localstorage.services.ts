import { MapDateFilms } from "../models/movie.models";

const getItems = (): MapDateFilms[] => {
  return JSON.parse(localStorage.getItem('films') || '[]');
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

export {setItems, removeItems, getItems};