import { MapDateFilms } from "./movie.models";

interface FavoritesModels {
  uuid: string;
  favorites: MapDateFilms[];
};

export type { FavoritesModels };