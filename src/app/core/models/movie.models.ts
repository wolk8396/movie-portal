interface MovieModel {
  total: number;
  totalPages: number;
  items: MovieItem[];
}

interface SearchByKeywordModel {
  keyword: string;
  pagesCount: number;
  films:FilmsItem
}

interface FilmsItem {
  filmId: number;
  nameRu: string;
  nameEn: string;
  type: string,
  year: string,
  description: string;
  filmLength: string;
  countries:Country[]
  genres: Genre[];
  rating: string,
  ratingVoteCount: string;
  posterUrl: string;
  posterUrlPreview:string;
}

interface MovieItem {
  kinopoiskId: number;
  imdbId?: string | null;
  nameRu: string;
  nameEn: string | null;
  nameOriginal?: string | null;
  countries: Country[]
  genres: Genre[];
  ratingKinopoisk?: number | null,
  ratingImdb?: number | null;
  year?: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  description?: string;
  [key: string]:any
}

interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

interface MapDateFilms {
  kinopoiskId: number;
  ratingKinopoisk?: number | null,
  ratingImdb?: number | null,
  posterUrl: string;
  nameRu?: string | null;
  genres?: string;
  description?: string;
  countries?: string;
  rating?: number | null;
  year?: number;
  [key: string]:any
}

export type {MovieModel, MovieItem, Country, Genre, MapDateFilms, SearchByKeywordModel}