import { useEffect, useState } from "react";
import { Country, Genre, MapDateFilms, MovieItem } from "../models/movie.models";

interface MapDate {
  dateFilm: MapDateFilms[]
}

export const useMapDate = (
  items: MovieItem[] | undefined | MovieItem, 
  isSuccess: boolean
) : MapDate  => {
  const [dateFilm, setDateFilm] = useState<MapDateFilms[]>([]);

  const mapCountries = (countries: Country[]): string => {
    const array = countries.map(item => item.country)
    return array.length > 1 ? array.join('/') : array.join('')
  };

  const mapGenres = (genres: Genre[]): string => {
    const array = genres.map(item => item.genre)
    return array.length > 1 ? array.join('/') : array.join('')
  };

  const mapFilmsDate = (items: MovieItem[]): MapDateFilms[] => {
   
    return items.map(films => {
      let description = !!films.description ? films.description : '';
      let nameRu;
      if (!!films.nameRu && !!films.nameRu && !!films.nameOriginal) {
        nameRu = 'title';
      };

      nameRu = !!films.nameRu ? films.nameRu : films.nameOriginal
      return {
        kinopoiskId: films.kinopoiskId,
        posterUrl: films.posterUrl,
        nameRu: nameRu,
        year: films.year,
        description: description,
        countries: mapCountries(films.countries),
        genres: mapGenres(films.genres),
      }
    })
  }

  useEffect(() => {
    if (typeof items !== 'undefined' && isSuccess) {
      if (Array.isArray(items)) {
        setDateFilm(mapFilmsDate(items))
      } else setDateFilm(mapFilmsDate([items]))
     
    }
  }, [items])

  return {dateFilm}
}