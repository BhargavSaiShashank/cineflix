"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Film, Filter } from 'lucide-react';
import { mockMovies } from '@/services/mockData';
import MovieCard from '@/components/movie/MovieCard';
import { Button } from '@/components/ui/button';

export default function MoviesPage() {
  const [filter, setFilter] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Movies' },
    { id: 'action', name: 'Action' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'drama', name: 'Drama' },
    { id: 'scifi', name: 'Sci-Fi' },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">Movies</h1>
          </div>
          
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-400 mr-3">Filter:</span>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button 
                  key={category.id}
                  variant="ghost" 
                  size="sm"
                  className={`text-sm ${filter === category.id ? 'bg-[#1e293b] text-pink-500' : 'text-gray-400'}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
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