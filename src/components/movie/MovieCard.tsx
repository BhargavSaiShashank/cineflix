"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Heart, Eye, Star, Plus, Check } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { tmdb } from '@/lib/tmdb';
import type { VideoResult } from '@/lib/tmdb';
import VideoPlayer from './VideoPlayer';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: string;
  className?: string;
}

const MovieCard = ({
  id,
  title,
  posterPath,
  rating,
  year,
  className,
}: MovieCardProps) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(true);
  const [trailer, setTrailer] = useState<VideoResult | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setIsLoadingTrailer(true);
        const videos = await tmdb.getMovieVideos(id);
        const officialTrailer = videos.results.find(
          video => 
            video.type.toLowerCase() === 'trailer' && 
            video.site === 'YouTube' &&
            video.official
        );
        
        const anyTrailer = videos.results.find(
          video => 
            video.type.toLowerCase() === 'trailer' && 
            video.site === 'YouTube'
        );

        if (officialTrailer) {
          setTrailer(officialTrailer);
        } else if (anyTrailer) {
          setTrailer(anyTrailer);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setIsLoadingTrailer(false);
      }
    };

    if (id) {
      fetchTrailer();
    }
  }, [id]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWatchlisted(!isWatchlisted);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleWatched = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWatched(!isWatched);
  };

  const handleRating = (e: React.MouseEvent, value: number) => {
    e.preventDefault();
    e.stopPropagation();
    setUserRating(userRating === value ? null : value);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const imageUrl = tmdb.getImageUrl(posterPath, 'w500');

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={cn("w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${id}`}>
        <Card className="overflow-hidden bg-black/20 backdrop-blur-sm border border-white/5 shadow-lg relative">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={imgError ? '/images/placeholder-poster.jpg' : imageUrl}
              alt={title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              priority={false}
              quality={75}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Rating badge */}
            <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/60 rounded-full px-2 py-1">
              <FaStar className="text-yellow-400 h-3 w-3" />
              <span className="text-xs font-medium text-white">{rating.toFixed(1)}</span>
            </div>
            
            {/* User rating if set */}
            {userRating && (
              <div className="absolute top-2 right-2 flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white text-xs font-bold">
                {userRating}
              </div>
            )}
            
            {/* Action buttons that appear on hover */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-4">
                {/* Trailer button - Moved to top */}
                {!isLoadingTrailer && trailer && (
                  <div className="mb-4">
                    <VideoPlayer video={trailer} poster={imageUrl} />
                  </div>
                )}

                {/* Star rating system */}
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={(e) => handleRating(e, value)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                        userRating && userRating >= value
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-label={`Rate ${value} star${value !== 1 ? 's' : ''}`}
                    >
                      <Star className="h-4 w-4" fill={userRating && userRating >= value ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={toggleWatchlist}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      isWatchlisted
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    {isWatchlisted ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={toggleWatched}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      isWatched
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
                  >
                    <Eye className="h-5 w-5" fill={isWatched ? "currentColor" : "none"} />
                  </button>
                  
                  <button
                    onClick={toggleFavorite}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                      isFavorite
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{year}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default MovieCard; 