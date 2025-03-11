"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import AppLayout from '@/components/layout/AppLayout';
import MovieCard from '@/components/movie/MovieCard';
import { Button } from '@/components/ui/button';
import { mockMovies, mockTopRatedMovies, mockTrendingMovies } from '@/services/mockData';

// Genre options
const genres = [
  { id: 'all', name: 'All' },
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'horror', name: 'Horror' },
  { id: 'romance', name: 'Romance' },
];

// Mood options
const moods = [
  { id: 'happy', name: 'Happy', emoji: '😊' },
  { id: 'sad', name: 'Sad', emoji: '😢' },
  { id: 'excited', name: 'Excited', emoji: '🤩' },
  { id: 'relaxed', name: 'Relaxed', emoji: '😌' },
  { id: 'scared', name: 'Scared', emoji: '😱' },
  { id: 'romantic', name: 'Romantic', emoji: '❤️' },
];

const DiscoverPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // Combine all movies for the discover page
  const allMovies = [...mockMovies, ...mockTopRatedMovies, ...mockTrendingMovies]
    .filter((movie, index, self) => 
      index === self.findIndex((m) => m.id === movie.id)
    );
  
  // Filter movies based on selected genre and mood
  // In a real app, this would be handled by the API
  const filteredMovies = allMovies;

  return (
    <AppLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>
        
        {/* Genre Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.id ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Mood Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {moods.map((mood) => (
              <motion.div
                key={mood.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.id === selectedMood ? null : mood.id)}
                className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border ${
                  selectedMood === mood.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="text-3xl mb-2">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* AI Recommendation Button */}
        <div className="mb-8">
          <Button variant="gradient" size="lg" className="w-full sm:w-auto">
            Get AI Recommendations
          </Button>
        </div>
        
        {/* Results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedGenre === 'all' 
              ? 'All Movies' 
              : `${genres.find(g => g.id === selectedGenre)?.name} Movies`}
            {selectedMood && ` for ${moods.find(m => m.id === selectedMood)?.name} Mood`}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
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
      </div>
    </AppLayout>
  );
};

export default DiscoverPage; 