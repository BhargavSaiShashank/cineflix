import { env } from '@/env.mjs';

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Common image sizes used by TMDB
export const IMAGE_SIZES = {
  backdrop: {
    w300: 'w300',
    w780: 'w780',
    w1280: 'w1280',
    original: 'original',
  },
  poster: {
    w92: 'w92',
    w154: 'w154',
    w185: 'w185',
    w342: 'w342',
    w500: 'w500',
    w780: 'w780',
    original: 'original',
  },
  profile: {
    w45: 'w45',
    w185: 'w185',
    h632: 'h632',
    original: 'original',
  },
} as const;

export type MovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = MovieResult & {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string | null;
};

class TMDBClient {
  private headers: HeadersInit;
  private baseUrl: string;

  constructor() {
    this.baseUrl = TMDB_API_URL;
    this.headers = {
      'Authorization': `Bearer ${env.TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  private async fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const queryParams = new URLSearchParams(params);
    const url = `${this.baseUrl}${endpoint}${params ? '?' + queryParams : ''}`;

    try {
      const response = await fetch(url, {
        headers: this.headers,
        next: {
          revalidate: 3600 // Cache for 1 hour
        }
      });

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('TMDB API request failed:', error);
      throw error;
    }
  }

  public getImageUrl(path: string | null, size: string = 'original'): string {
    if (!path) {
      return '/images/placeholder-poster.jpg';
    }

    // Ensure path starts with a forward slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Validate size against known sizes
    const validSize = Object.values(IMAGE_SIZES).some(
      sizeGroup => Object.values(sizeGroup).includes(size)
    );
    const finalSize = validSize ? size : 'original';

    try {
      return `${TMDB_IMAGE_BASE_URL}/${finalSize}${cleanPath}`;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return '/images/placeholder-poster.jpg';
    }
  }

  public async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB('/movie/popular', { page: page.toString() });
  }

  public async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB('/movie/top_rated', { page: page.toString() });
  }

  public async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromTMDB(`/movie/${movieId}`);
  }

  public async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB('/search/movie', {
      query,
      page: page.toString(),
      include_adult: 'false',
      language: 'en-US',
    });
  }

  public async getMovieRecommendations(movieId: number, page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/${movieId}/recommendations`, {
      page: page.toString(),
      language: 'en-US',
    });
  }

  public async getSimilarMovies(movieId: number, page: number = 1): Promise<MovieResponse> {
    return this.fetchFromTMDB(`/movie/${movieId}/similar`, {
      page: page.toString(),
      language: 'en-US',
    });
  }

  public async discoverMovies(params: {
    page?: number;
    sort_by?: string;
    with_genres?: string;
    'vote_average.gte'?: number;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
  } = {}): Promise<MovieResponse> {
    return this.fetchFromTMDB('/discover/movie', {
      ...params as Record<string, string>,
      language: 'en-US',
      include_adult: 'false',
    });
  }
}

export const tmdb = new TMDBClient(); 