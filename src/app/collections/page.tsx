"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Film, Star, TrendingUp, Heart } from 'lucide-react';
import { mockMovies } from '@/services/mockData';

// Collection types
interface Collection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  movies: typeof mockMovies;
}

export default function CollectionsPage() {
  const router = useRouter();
  
  // Create collections from mock data
  const collections: Collection[] = [
    {
      id: 'oscar-winners',
      name: 'Oscar Winners',
      description: 'Award-winning films that have made cinematic history',
      icon: <Award className="h-5 w-5 text-yellow-500" />,
      movies: mockMovies.slice(0, 8),
    },
    {
      id: 'cult-classics',
      name: 'Cult Classics',
      description: 'Beloved films with dedicated fan followings',
      icon: <Heart className="h-5 w-5 text-red-500" />,
      movies: mockMovies.slice(8, 16),
    },
    {
      id: 'directors-spotlight',
      name: 'Directors Spotlight',
      description: 'Masterpieces from legendary filmmakers',
      icon: <Film className="h-5 w-5 text-blue-500" />,
      movies: mockMovies.slice(4, 12),
    },
    {
      id: 'seasonal-picks',
      name: 'Summer Blockbusters',
      description: 'Perfect films for the summer season',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      movies: mockMovies.slice(2, 10),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Curated Collections</h1>
        
        <Tabs defaultValue="featured" className="w-full">
          <TabsList>
            <TabsTrigger value="featured" className="data-[state=active]:bg-pink-500">Featured</TabsTrigger>
            <TabsTrigger value="genres" className="data-[state=active]:bg-pink-500">Genres</TabsTrigger>
            <TabsTrigger value="moods" className="data-[state=active]:bg-pink-500">Moods</TabsTrigger>
            <TabsTrigger value="seasonal" className="data-[state=active]:bg-pink-500">Seasonal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <div 
                  key={collection.id}
                  className="bg-[#1e293b]/80 rounded-xl border border-gray-800 overflow-hidden hover:border-pink-500 transition-all cursor-pointer"
                  onClick={() => router.push(`/collections/${collection.id}`)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {collection.icon}
                      <h3 className="text-xl font-bold text-white ml-2">{collection.name}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{collection.description}</p>
                    
                    <div className="flex overflow-x-auto space-x-3 pb-4">
                      {collection.movies.slice(0, 4).map((movie) => (
                        <div key={movie.id} className="flex-shrink-0 w-24">
                          <Image 
                            src={movie.posterPath} 
                            alt={movie.title} 
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                            width={200}
                            height={300}
                          />
                        </div>
                      ))}
                      <div className="flex-shrink-0 w-24 flex items-center justify-center bg-[#0f172a] rounded-lg">
                        <span className="text-white text-sm">+{collection.movies.length - 4} more</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="genres" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation'].map((genre) => (
                <Button 
                  key={genre}
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all rounded-xl"
                  onClick={() => router.push(`/genres/${genre.toLowerCase()}`)}
                >
                  <span className="text-white text-lg">{genre}</span>
                  <span className="text-gray-400 text-xs">{Math.floor(Math.random() * 100) + 50} movies</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="moods" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Feel-Good Movies', 'Date Night', 'Family Movie Night', 'Mind-Bending', 'Tearjerkers', 'Adrenaline Rush'].map((mood) => (
                <div 
                  key={mood}
                  className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-6 hover:border-pink-500 transition-all cursor-pointer"
                  onClick={() => router.push(`/moods/${mood.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{mood}</h3>
                  <p className="text-gray-400 mb-4">Perfect movies for when you&apos;re in the mood for {mood.toLowerCase()}</p>
                  
                  <div className="flex overflow-x-auto space-x-3 pb-2">
                    {mockMovies.slice(0, 3).map((movie) => (
                      <div key={movie.id} className="flex-shrink-0 w-20">
                        <Image 
                          src={movie.posterPath} 
                          alt={movie.title} 
                          className="w-full aspect-[2/3] object-cover rounded-lg"
                          width={200}
                          height={300}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="seasonal" className="mt-0">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Current Season: Summer</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {mockMovies.slice(0, 6).map((movie) => (
                    <div key={movie.id} className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
                      <Image 
                        src={movie.posterPath} 
                        alt={movie.title} 
                        className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                        width={500}
                        height={750}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white font-bold truncate">{movie.title}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-3 w-3 text-pink-500 mr-1" />
                          <span className="text-white text-sm">{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon: Fall Collection</h2>
                <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-6">
                  <p className="text-gray-400 mb-4">Our Fall Collection will be available starting September 22nd. Get ready for cozy movies, Halloween specials, and award season contenders!</p>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Get Notified
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 