import axios from 'axios';

// Note: In a real application, you would store this in an environment variable
const API_KEY = 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
}

export const tmdbApi = {
  // Get trending movies
  getTrending: async (): Promise<Movie[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  },

  // Get popular movies
  getPopular: async (): Promise<Movie[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  // Get top rated movies
  getTopRated: async (): Promise<Movie[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
  },

  // Get movie details
  getMovieDetails: async (id: number): Promise<MovieDetails | null> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${id}:`, error);
      return null;
    }
  },

  // Search movies
  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      return [];
    }
  },

  // Get image URL
  getImageUrl: (path: string, size: string = 'w500'): string => {
    if (!path) return '/placeholder-poster.jpg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  // Format movie for UI
  formatMovie: (movie: Movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: tmdbApi.getImageUrl(movie.poster_path),
      backdropPath: tmdbApi.getImageUrl(movie.backdrop_path, 'original'),
      rating: movie.vote_average,
      year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : 'Unknown',
    };
  },
}; 