"use client";

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';

import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import MovieCarousel from '@/components/movie/MovieCarousel';
import { mockMovies, mockRecommendedMovies } from '@/services/mockData';

const MovieDetailsPage = () => {
  const params = useParams();
  const movieId = Number(params.id);
  
  // Find the movie from our mock data
  const movie = mockMovies.find(m => m.id === movieId) || mockRecommendedMovies.find(m => m.id === movieId);
  
  if (!movie) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="text-muted-foreground">The movie you're looking for doesn't exist or has been removed.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Hero Section with Movie Backdrop */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/1] overflow-hidden">
          <Image
            src={movie.backdropPath}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
        </div>
      </section>

      {/* Movie Details */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] md:aspect-auto md:col-span-1">
          <Image
            src={movie.posterPath}
            alt={movie.title}
            fill
            className="object-cover rounded-lg md:rounded-xl"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* Movie Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-1" />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-gray-400 mr-1" />
              <span>120 min</span>
            </div>
          </div>

          <p className="text-lg mb-6">{movie.overview}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="secondary">Action</Button>
            <Button variant="secondary">Adventure</Button>
            <Button variant="secondary">Sci-Fi</Button>
          </div>

          <div className="flex space-x-3">
            <Button variant="gradient" size="lg">
              Watch Now
            </Button>
            <Button variant="outline" size="lg">
              Add to Watchlist
            </Button>
          </div>
        </div>
      </section>

      {/* Similar Movies */}
      <section className="mb-8">
        <MovieCarousel title="Similar Movies" movies={mockRecommendedMovies} />
      </section>
    </AppLayout>
  );
};

export default MovieDetailsPage; 