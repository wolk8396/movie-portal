import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MovieItem, MovieModel } from '../models/movie.models'

export const KEY_MOVIE_API = 'movieAPI';

export const movieApi = createApi({
  reducerPath: KEY_MOVIE_API,
  baseQuery: fetchBaseQuery({
    baseUrl:' https://kinopoiskapiunofficial.tech/api/v2.2/films',
    headers: {
      'X-API-KEY': 'f87b1656-baee-4713-8a80-cf98befdcfa2',
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getCollectionsMovie: builder.query<MovieModel, { type: string, page: number }>({
      query: ({ type, page }) => `collections?type=${type}&page=${page}`,
    }),
    getMovieDescription: builder.query<MovieItem, { id: string | undefined}>({
      query: ({ id }) => `${id}`,
    }),
  }),
})
