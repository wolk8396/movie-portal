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
}

interface Country {
  country: string;
}

interface Genre {
  genre: string;
}

export type {MovieModel, MovieItem, Country, Genre}