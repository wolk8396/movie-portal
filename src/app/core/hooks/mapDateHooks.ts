import { useEffect, useState } from "react";
import { Country, Genre, MapDateFilms, MovieItem } from "../models/movie.models";
import { DynamicKeyModels } from "../models/dynamic.key.models";

interface MapDate {
  dateFilm: MapDateFilms[]
}

export const useMapDate = (
  items: MovieItem[] | undefined | MovieItem, 
  isSuccess: boolean,
  sort?: DynamicKeyModels
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

  const SortItem = (items: MapDateFilms[], option: DynamicKeyModels): MapDateFilms[] => {
    const key = option.value;
    if (option.title.includes('des')) {
      return items.sort((a: MapDateFilms, b: MapDateFilms) => {
        if (key === 'nameRu' && b.nameRu &&  a.nameRu) {
          return b.nameRu.localeCompare(a.nameRu);
        }
        return b[key] - a[key];
      });
    }

    return items.sort((a: MapDateFilms, b: MapDateFilms) => {
      if (key === 'nameRu' && b.nameRu &&  a.nameRu) {
        return a.nameRu.localeCompare(b.nameRu);
      }
      return a[key] - b[key];
    });
  };

  const mapFilmsDate = (items: MovieItem[] | null): MapDateFilms[] => {
   if (items) {
      const itemMap = items.map(films => {
        let description = !!films.description ? films.description : '';
        let nameRu;
        if (!!films.nameRu && !!films.nameRu && !!films.nameOriginal) {
          nameRu = 'title';
        };

        nameRu = !!films.nameRu ? films.nameRu : films.nameOriginal
        return {
          kinopoiskId: films.kinopoiskId,
          ratingKinopoisk: films.ratingKinopoisk,
          ratingImdb: films.ratingImdb,
          posterUrl: films.posterUrl,
          nameRu: nameRu,
          year: films.year,
          description: description,
          countries: mapCountries(films.countries),
          genres: mapGenres(films.genres),
        }
      })
      
      return !sort ? itemMap : SortItem(itemMap, sort);
    }
   return [];
  }

  useEffect(() => {
    if (typeof items !== 'undefined' && isSuccess) {
      if (Array.isArray(items)) {
        setDateFilm(mapFilmsDate(items))
      } else setDateFilm(mapFilmsDate([items]))
    }
  }, [items, sort])

  return {dateFilm}
}