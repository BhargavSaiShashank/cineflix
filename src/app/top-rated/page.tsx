"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Award, Star } from 'lucide-react';
import { mockMovies } from '@/services/mockData';
import MovieCard from '@/components/movie/MovieCard';

export default function TopRatedPage() {
  // Sort movies by rating in descending order
  const topRatedMovies = [...mockMovies].sort((a, b) => b.rating - a.rating);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Award className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Top Rated Movies</h1>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topRatedMovies.map((movie, index) => (
            <div key={movie.id} className="relative">
              {index < 3 && (
                <div className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{index + 1}</span>
                </div>
              )}
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                rating={movie.rating}
                year={movie.year}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-[#1e293b] rounded-xl border border-gray-800 p-6">
          <div className="flex items-center mb-4">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-white">Rating System</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Our ratings are based on a combination of user reviews, critic scores, and overall popularity.
            Movies with a rating of 4.5 and above are considered exceptional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">User Reviews</h3>
              <p className="text-gray-400 text-sm">Ratings from our community of movie enthusiasts</p>
            </div>
            <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Critic Scores</h3>
              <p className="text-gray-400 text-sm">Professional reviews from trusted film critics</p>
            </div>
            <div className="bg-[#0f172a]/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Popularity</h3>
              <p className="text-gray-400 text-sm">Based on views, watchlists, and social media buzz</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 