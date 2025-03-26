import { useState, useCallback } from 'react';
import { tmdb, type MovieResponse, type MovieDetails } from '@/lib/tmdb';

interface UseTMDBOptions {
  onError?: (error: Error) => void;
}

export function useTMDB(options: UseTMDBOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: Error) => {
    setError(error);
    options.onError?.(error);
  }, [options]);

  const wrapRequest = useCallback(async <T>(request: Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await request;
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      handleError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const getPopularMovies = useCallback((page?: number) => {
    return wrapRequest(tmdb.getPopularMovies(page));
  }, [wrapRequest]);

  const getTopRatedMovies = useCallback((page?: number) => {
    return wrapRequest(tmdb.getTopRatedMovies(page));
  }, [wrapRequest]);

  const getMovieDetails = useCallback((movieId: number) => {
    return wrapRequest(tmdb.getMovieDetails(movieId));
  }, [wrapRequest]);

  const searchMovies = useCallback((query: string, page?: number) => {
    return wrapRequest(tmdb.searchMovies(query, page));
  }, [wrapRequest]);

  const getMovieRecommendations = useCallback((movieId: number, page?: number) => {
    return wrapRequest(tmdb.getMovieRecommendations(movieId, page));
  }, [wrapRequest]);

  const getSimilarMovies = useCallback((movieId: number, page?: number) => {
    return wrapRequest(tmdb.getSimilarMovies(movieId, page));
  }, [wrapRequest]);

  const discoverMovies = useCallback((params = {}) => {
    return wrapRequest(tmdb.discoverMovies(params));
  }, [wrapRequest]);

  const getImageUrl = useCallback((path: string | null, size?: string) => {
    return tmdb.getImageUrl(path, size);
  }, []);

  return {
    isLoading,
    error,
    getPopularMovies,
    getTopRatedMovies,
    getMovieDetails,
    searchMovies,
    getMovieRecommendations,
    getSimilarMovies,
    discoverMovies,
    getImageUrl,
  };
} 