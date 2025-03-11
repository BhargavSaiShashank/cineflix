"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
  year: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  className?: string;
}

const MovieCarousel = ({ title, movies, className }: MovieCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-[160px] md:w-[200px] snap-start"
          >
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
    </div>
  );
};

export default MovieCarousel; 