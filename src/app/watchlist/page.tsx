"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Film, Plus } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

export default function WatchlistPage() {
  const { user } = useAuth();
  
  // Use mock data for the watchlist
  const watchlistMovies = mockMovies.slice(0, 8);
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to view your watchlist</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Movies
          </Button>
        </div>
        
        {watchlistMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlistMovies.map(movie => (
              <div key={movie.id} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
                <Image 
                  src={movie.posterPath} 
                  alt={movie.title} 
                  className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={750}
                />
                <div className="absolute top-2 right-2 z-20">
                  <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white font-bold truncate">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="bg-[#1e293b] border-gray-800 text-center p-8">
            <CardContent className="pt-6">
              <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
              <p className="text-gray-400 mb-6">Start adding movies to keep track of what you want to watch</p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Browse Movies
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 