"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { mockMovies, mockRecommendedMovies } from '@/services/mockData';

// Genre options
const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", 
  "Documentary", "Drama", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Thriller", "Western", "Family"
];

export default function RecommendationEngine() {
  // States
  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);
  const [movieInput, setMovieInput] = useState('');
  const [mood, setMood] = useState('');
  const [preferences, setPreferences] = useState('');
  const [lengthPreference, setLengthPreference] = useState<number[]>([120]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [hidePopular, setHidePopular] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Handle adding favorite movies
  const addFavoriteMovie = () => {
    if (movieInput.trim() && !favoriteMovies.includes(movieInput.trim())) {
      setFavoriteMovies([...favoriteMovies, movieInput.trim()]);
      setMovieInput('');
    }
  };

  // Handle removing a favorite movie
  const removeFavoriteMovie = (movie: string) => {
    setFavoriteMovies(favoriteMovies.filter(m => m !== movie));
  };

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Generate recommendations
  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real implementation, you would call your AI service here
      // For now, we're using mock data filtered by selected genres if any
      let filteredRecommendations = [...mockRecommendedMovies].map(movie => ({
        ...movie,
        genres: 'genres' in movie ? movie.genres : []
      }));
      
      // Apply filters based on user preferences
      if (selectedGenres.length > 0) {
        // This is a simplified mock filtering - in reality you'd use the actual genre data
        const genreIndices = selectedGenres.map(g => genres.indexOf(g));
        filteredRecommendations = filteredRecommendations.filter(
          (_, index) => index % genreIndices.length === 0
        );
      }
      
      // Apply length preference filter (mock implementation)
      if (lengthPreference[0] < 120) {
        filteredRecommendations = filteredRecommendations.filter((_, index) => index % 2 === 0);
      }
      
      // Apply hide popular filter
      if (hidePopular) {
        filteredRecommendations = filteredRecommendations.filter(movie => movie.rating < 8.5);
      }
      
      setRecommendations(filteredRecommendations);
      setHasGenerated(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">AI Movie Recommendation Engine</h1>
          <p className="text-gray-400">Tell us what you like, and we&apos;ll find your next favorite film</p>
        </div>
        
        {/* Input section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-400" />
              Your Movie Preferences
            </CardTitle>
            <CardDescription>
              The more information you provide, the better recommendations you&apos;ll get
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Favorite movies input */}
            <div className="space-y-4">
              <Label>Your favorite movies</Label>
              <div className="flex gap-2">
                <Input 
                  value={movieInput}
                  onChange={(e) => setMovieInput(e.target.value)}
                  placeholder="Enter a movie title"
                  onKeyDown={(e) => e.key === 'Enter' && addFavoriteMovie()}
                  className="bg-gray-800 border-gray-700"
                />
                <Button 
                  onClick={addFavoriteMovie}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              
              {/* Display favorite movies as badges */}
              {favoriteMovies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {favoriteMovies.map((movie, index) => (
                    <Badge key={index} className="pl-3 pr-2 py-1.5 gap-1 bg-gray-700 hover:bg-gray-600">
                      {movie}
                      <button 
                        onClick={() => removeFavoriteMovie(movie)}
                        className="ml-1 rounded-full hover:bg-gray-500 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mood input */}
            <div className="space-y-2">
              <Label>Your current mood</Label>
              <Input 
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="e.g., Relaxed, Excited, Thoughtful"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            {/* Additional preferences */}
            <div className="space-y-2">
              <Label>Additional preferences (optional)</Label>
              <Textarea 
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Tell us what themes, styles, or elements you enjoy in movies..."
                className="bg-gray-800 border-gray-700 min-h-[100px]"
              />
            </div>
            
            {/* Genre selection */}
            <div className="space-y-3">
              <Label>Genres</Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge 
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`cursor-pointer py-1.5 px-3 ${
                      selectedGenres.includes(genre) 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Length preference */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Preferred Length (minutes)</Label>
                <span className="text-sm text-gray-400">{lengthPreference[0]}</span>
              </div>
              <Slider 
                value={lengthPreference}
                onValueChange={setLengthPreference}
                min={60}
                max={240}
                step={10}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 hour</span>
                <span>4 hours</span>
              </div>
            </div>
            
            {/* Hide popular toggle */}
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="hide-popular" className="flex items-center gap-2 cursor-pointer">
                <Filter className="h-4 w-4 text-gray-400" />
                Hide mainstream popular movies
              </Label>
              <Switch 
                id="hide-popular" 
                checked={hidePopular}
                onCheckedChange={setHidePopular}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={generateRecommendations}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-pulse">Analyzing your preferences...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Results section */}
        {hasGenerated && !isAnalyzing && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendations.map((movie) => (
                <Card key={movie.id} className="overflow-hidden bg-gray-800 border-gray-700">
                  <div className="relative h-[300px]">
                    <Image 
                      src={movie.posterPath}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{movie.year}</p>
                    <div className="flex items-center text-sm mb-3">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{movie.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {movie.overview}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button 
                onClick={generateRecommendations} 
                variant="outline"
                className="px-8"
              >
                Refine Recommendations
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}