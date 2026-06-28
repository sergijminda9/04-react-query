import axios from 'axios';
import type { MoviesResponse, MovieDetails } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await tmdbClient.get<MoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return data;
};

export const fetchMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  const { data } = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);

  return data;
};
