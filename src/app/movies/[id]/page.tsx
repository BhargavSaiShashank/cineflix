"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Star, 
  Clock, 
  Heart, 
  Share, 
  MessageSquare, 
  Plus,
  Download,
  Info
} from 'lucide-react';
import { mockMovies } from '@/services/mockData';
import MoviePlayer from '@/components/movie/MoviePlayer';
import { useWatchProgress } from '@/contexts/WatchProgressContext';

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = parseInt(params.id as string);
  const [isPlaying, setIsPlaying] = useState(false);
  const { getProgress } = useWatchProgress();
  
  // Find movie from mock data
  const movie = mockMovies.find(m => m.id === movieId) || mockMovies[0];
  
  // Get watch progress if available
  const progress = getProgress(movieId);
  const progressPercentage = progress?.progress || 0;
  
  // Mock data for similar movies
  const similarMovies = mockMovies
    .filter(m => m.id !== movieId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
  
  // Mock cast data
  const cast = [
    { id: 1, name: "Actor One", character: "Character One", image: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Actor Two", character: "Character Two", image: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Actor Three", character: "Character Three", image: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Actor Four", character: "Character Four", image: "https://i.pravatar.cc/150?img=4" },
  ];
  
  // Mock reviews
  const reviews = [
    { 
      id: 1, 
      user: "User One", 
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4.5, 
      date: "2 weeks ago",
      content: "This movie was amazing! The cinematography and acting were top-notch. I would definitely recommend it to anyone who enjoys this genre."
    },
    { 
      id: 2, 
      user: "User Two", 
      avatar: "https://i.pravatar.cc/150?img=6",
      rating: 3.5, 
      date: "1 month ago",
      content: "Good movie overall, but I felt the pacing was a bit off in the middle. The ending was satisfying though."
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      {isPlaying ? (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <MoviePlayer
            movieId={movieId}
            title={movie.title}
            videoSrc="/sample-video.mp4" // Replace with actual video source
            posterSrc={movie.backdropPath}
            onClose={() => setIsPlaying(false)}
          />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative h-[70vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.backdropPath})` }}
            ></div>
            
            <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-20">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
                  {movie.title}
                </h1>
                <div className="flex items-center mb-4 flex-wrap gap-2">
                  <div className="flex items-center bg-pink-500/20 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-pink-500 mr-1" fill="currentColor" />
                    <span className="text-white font-bold">{movie.rating}</span>
                  </div>
                  <span className="text-gray-300">{movie.year}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-gray-300">2h 15m</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <div className="flex gap-2">
                    {["Action", "Adventure", "Sci-Fi"].map(genre => (
                      <Badge key={genre} variant="outline" className="bg-[#1e293b]/80 text-white border-gray-700">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-6 text-lg max-w-2xl">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6"
                    onClick={() => setIsPlaying(true)}
                  >
                    <Play className="h-5 w-5 mr-2" /> 
                    {progressPercentage > 0 && progressPercentage < 95 
                      ? 'Continue Watching' 
                      : 'Watch Now'}
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-6">
                    <Plus className="h-5 w-5 mr-2" /> Add to Watchlist
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-6">
                    <Download className="h-5 w-5 mr-2" /> Download
                  </Button>
                </div>
                
                {/* Progress bar for continue watching */}
                {progressPercentage > 0 && progressPercentage < 95 && (
                  <div className="mt-6 max-w-md">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Continue watching</span>
                      <span>{Math.round(progressPercentage)}% complete</span>
                    </div>
                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Content Tabs */}
          <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-4 max-w-md mb-8 bg-[#1e293b]">
                <TabsTrigger value="about" className="data-[state=active]:bg-pink-500">About</TabsTrigger>
                <TabsTrigger value="cast" className="data-[state=active]:bg-pink-500">Cast</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-pink-500">Reviews</TabsTrigger>
                <TabsTrigger value="similar" className="data-[state=active]:bg-pink-500">Similar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                    <p className="text-gray-300 mb-6">
                      {movie.overview}
                      {/* Extended synopsis */}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
                      nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
                      nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mb-3">Director</h3>
                    <p className="text-gray-300 mb-6">Director Name</p>
                    
                    <h3 className="text-xl font-bold text-white mb-3">Writers</h3>
                    <p className="text-gray-300 mb-6">Writer One, Writer Two</p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-400 mb-1">Release Date</h3>
                        <p className="text-white">January 1, {movie.year}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 mb-1">Runtime</h3>
                        <p className="text-white">2h 15m</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 mb-1">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Action", "Adventure", "Sci-Fi"].map(genre => (
                            <Badge key={genre} variant="outline" className="bg-[#1e293b] text-white border-gray-700">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-gray-400 mb-1">Language</h3>
                        <p className="text-white">English</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="cast">
                <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="bg-[#1e293b] rounded-lg overflow-hidden">
                      <Image 
                        src={person.image} 
                        alt={person.name} 
                        width={200} 
                        height={200}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-bold text-white">{person.name}</h3>
                        <p className="text-gray-400 text-sm">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Reviews</h2>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" /> Write a Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-[#1e293b] rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Image 
                          src={review.avatar} 
                          alt={review.user} 
                          width={50} 
                          height={50}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-white">{review.user}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-pink-500 mr-1" fill="currentColor" />
                              <span className="text-white">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{review.date}</p>
                          <p className="text-gray-300">{review.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="similar">
                <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similarMovies.map(movie => (
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
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
} 