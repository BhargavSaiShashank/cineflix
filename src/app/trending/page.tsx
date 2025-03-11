"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { TrendingUp } from 'lucide-react';
import { mockMovies } from '@/services/mockData';
import MovieCard from '@/components/movie/MovieCard';

export default function TrendingPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Trending Movies</h1>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              rating={movie.rating}
              year={movie.year}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
} 