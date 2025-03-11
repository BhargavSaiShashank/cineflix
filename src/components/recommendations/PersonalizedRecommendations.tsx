"use client";

import React, { useState, useEffect } from 'react';
import { useWatchProgress } from '@/contexts/WatchProgressContext';
import { mockMovies } from '@/services/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Star, Info, Plus, Check } from 'lucide-react';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useToast } from '@/components/ui/use-toast';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  rating: number;
  year: string;
  genres?: string[];
}

export default function PersonalizedRecommendations() {
  const { getContinueWatchingList } = useWatchProgress();
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the user's watch history
    const watchedMovies = getContinueWatchingList();
    
    if (watchedMovies.length === 0) {
      // If no watch history, show trending movies
      const trending = mockMovies.sort(() => 0.5 - Math.random()).slice(0, 6);
      setRecommendations(trending);
      setLoading(false);
      return;
    }
    
    // In a real app, we would send the watched movies to an API
    // and get personalized recommendations based on the user's taste
    // For now, we'll simulate this with a simple algorithm
    
    // Extract genres from watched movies
    const watchedGenres = new Set<string>();
    watchedMovies.forEach(movie => {
      const foundMovie = mockMovies.find(m => m.id === movie.movieId);
      if (foundMovie && foundMovie.genres) {
        foundMovie.genres.forEach(genre => watchedGenres.add(genre));
      }
    });
    
    // Find movies with similar genres that the user hasn't watched yet
    const unwatchedMovies = mockMovies.filter(movie => 
      !watchedMovies.some(watched => watched.movieId === movie.id)
    );
    
    // Score each movie based on genre overlap
    const scoredMovies = unwatchedMovies.map(movie => {
      let score = 0;
      if (movie.genres) {
        movie.genres.forEach(genre => {
          if (watchedGenres.has(genre)) {
            score += 1;
          }
        });
      }
      return { movie, score };
    });
    
    // Sort by score and take the top 6
    const topRecommendations = scoredMovies
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.movie);
    
    setRecommendations(topRecommendations);
    setLoading(false);
  }, [getContinueWatchingList]);

  const handleAddToWatchlist = (movie: Movie) => {
    addToWatchlist({
      id: movie.id,
      title: movie.title,
      posterPath: movie.posterPath
    });
    
    toast({
      title: "Added to watchlist",
      description: `${movie.title} has been added to your watchlist.`,
      variant: "success"
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Personalized For You</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Personalized For You</h2>
          <p className="text-gray-400 text-sm">Based on your viewing history</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((movie) => (
          <div key={movie.id} className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
            <Image 
              src={movie.posterPath} 
              alt={movie.title} 
              className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              width={300}
              height={450}
            />
            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 bg-black/50 hover:bg-pink-600/80 text-white rounded-full"
                onClick={() => handleAddToWatchlist(movie)}
                disabled={isInWatchlist(movie.id)}
              >
                {isInWatchlist(movie.id) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-bold truncate">{movie.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-pink-500 mr-1" />
                  <span className="text-white text-sm">{movie.rating}</span>
                </div>
                <Link href={`/movies/${movie.id}`}>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-white hover:text-pink-500">
                    <Info className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 