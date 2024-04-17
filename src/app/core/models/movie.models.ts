interface MovieModel {
  total: number;
  totalPages: number;
  items: MovieItem[];
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
}

interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

interface MapDateFilms {
  kinopoiskId: number;
  posterUrl: string;
  nameRu?: string | null;
  genres?: string;
  description?: string;
  countries?: string;
  year?: number;
}

export type {MovieModel, MovieItem, Country, Genre, MapDateFilms}