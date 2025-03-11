"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Info, Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMovies } from '@/services/mockData';

interface SimilarContentRecommendationsProps {
  baseMovieId?: number;
  title?: string;
  description?: string;
  limit?: number;
}

export default function SimilarContentRecommendations({
  baseMovieId,
  title = "Similar Content You Might Enjoy",
  description = "Based on your viewing history and preferences",
  limit = 6
}: SimilarContentRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  // Simulate fetching recommendations
  useEffect(() => {
    // In a real app, this would be an API call with the baseMovieId
    // For now, we'll just shuffle the mock movies and take a subset
    const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, limit);
    
    // Add a similarity score to each movie (mock data)
    const withSimilarity = selected.map(movie => ({
      ...movie,
      similarityScore: Math.floor(Math.random() * 30) + 70, // 70-99% similarity
      similarityReason: getSimilarityReason()
    }));
    
    setRecommendations(withSimilarity);
  }, [baseMovieId, limit]);

  // Generate a random similarity reason
  function getSimilarityReason() {
    const reasons = [
      "Similar genre",
      "Same director",
      "Similar themes",
      "Actors you like",
      "Popular with similar viewers",
      "Similar mood",
      "Recommended by critics",
      "Similar time period",
      "Similar visual style"
    ];
    
    // Return 1-3 random reasons
    const numReasons = Math.floor(Math.random() * 3) + 1;
    const selectedReasons = [];
    
    for (let i = 0; i < numReasons; i++) {
      const randomIndex = Math.floor(Math.random() * reasons.length);
      const reason = reasons[randomIndex];
      
      if (!selectedReasons.includes(reason)) {
        selectedReasons.push(reason);
      }
    }
    
    return selectedReasons;
  }

  return (
    <div className="py-8">
      <div className="container px-4 mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendations.map((movie) => (
            <div 
              key={movie.id}
              className="relative group"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={movie.posterPath}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Similarity badge */}
                <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {movie.similarityScore}% match
                </div>
                
                {/* Hover content */}
                {hoveredMovie === movie.id && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10 transform transition-transform duration-300">
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">{movie.title}</h3>
                    
                    <div className="flex items-center mb-2">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-white text-xs">{movie.rating}/10</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-gray-300 text-xs">{movie.year}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {movie.similarityReason && movie.similarityReason.map((reason, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-800/50 text-gray-300 border-gray-700">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-1">
                      <Link href={`/movies/${movie.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                          <Play className="h-3 w-3 mr-1" /> Watch
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                        <Info className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 