"use client";

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Search, X } from 'lucide-react';
import { mockMovies } from '@/services/mockData';
import MovieCard from '@/components/movie/MovieCard';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockMovies>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Filter mock movies based on search query
    const results = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Search className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Search Movies</h1>
        </div>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-4 pl-10 pr-12 bg-[#1e293b] border border-gray-700 rounded-lg text-white focus:ring-pink-500 focus:border-pink-500"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-14 inset-y-0 flex items-center pr-3"
                onClick={clearSearch}
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            )}
            <Button
              type="submit"
              className="absolute right-2.5 bottom-2.5 top-2.5 bg-pink-600 hover:bg-pink-700"
            >
              Search
            </Button>
          </div>
        </form>
        
        {hasSearched && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${searchQuery}"` 
                : `No results found for "${searchQuery}"`}
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((movie) => (
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
            ) : (
              <div className="bg-[#1e293b] rounded-xl border border-gray-800 p-8 text-center">
                <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or browse our categories</p>
              </div>
            )}
          </div>
        )}
        
        {!hasSearched && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-6">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror', 'Romance', 'Animation'].map((genre) => (
                <Button 
                  key={genre}
                  variant="outline" 
                  className="bg-[#1e293b] border-gray-700 text-white hover:bg-[#2d3748] hover:border-pink-500"
                  onClick={() => {
                    setSearchQuery(genre);
                    setHasSearched(true);
                    setSearchResults(mockMovies.slice(0, 5));
                  }}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
} 