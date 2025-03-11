"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Search, Brain, Film, Heart, Clock, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Define movie type
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

// Moods for recommendation
const MOODS = [
  "Happy", "Sad", "Excited", "Relaxed", "Tense", "Romantic", "Nostalgic", "Inspired"
];

// Genres for filtering
const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", 
  "Thriller", "Western", "Biography", "Family", "Musical", "War"
];

export default function RecommendationEngine() {
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('mood');
  const [lengthPreference, setLengthPreference] = useState([90, 150]); // Movie length in minutes
  const [ratingThreshold, setRatingThreshold] = useState(7.0); // Minimum rating

  // Handle mood selection
  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  // Handle genre selection
  const handleGenreSelection = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  // Process natural language query
  const handleNaturalLanguageSearch = () => {
    if (!naturalLanguageQuery.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an AI service
      // For now, we'll use mock data and simple filtering
      const keywords = naturalLanguageQuery.toLowerCase();
      
      const filtered = mockMovies.filter(movie => {
        const matchesTitle = movie.title.toLowerCase().includes(keywords);
        const matchesOverview = movie.overview.toLowerCase().includes(keywords);
        return matchesTitle || matchesOverview;
      });
      
      setRecommendations(filtered.length > 0 ? filtered : getRandomRecommendations(3));
      setIsProcessing(false);
    }, 1500);
  };

  // Generate mood-based recommendations
  const generateMoodRecommendations = () => {
    if (!selectedMood) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would use a sophisticated AI model
      // For now, we'll use mock data and randomization
      setRecommendations(getRandomRecommendations(4));
      setIsProcessing(false);
    }, 1500);
  };

  // Generate personalized recommendations based on genres and preferences
  const generatePersonalizedRecommendations = () => {
    if (selectedGenres.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Filter by selected genres (in a real app, this would be more sophisticated)
      const filtered = mockMovies.filter(movie => {
        // Check if any of the movie's genres match the selected genres
        return movie.genres?.some(genre => selectedGenres.includes(genre)) || false;
      });
      
      setRecommendations(filtered.length > 0 ? filtered.slice(0, 5) : getRandomRecommendations(5));
      setIsProcessing(false);
    }, 1500);
  };

  // Helper function to get random recommendations
  const getRandomRecommendations = (count: number): Movie[] => {
    const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Handle feedback on recommendations
  const handleFeedback = (movieId: number, isPositive: boolean) => {
    // In a real app, this would send feedback to the AI model for learning
    console.log(`User ${isPositive ? 'liked' : 'disliked'} movie ${movieId}`);
    
    // For demo purposes, we'll just show a different recommendation
    if (!isPositive) {
      setRecommendations(prev => 
        prev.filter(movie => movie.id !== movieId).concat(getRandomRecommendations(1))
      );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          AI-Powered Movie Recommendations
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover your next favorite movie with our advanced AI recommendation engine. 
          Tell us how you feel, what you like, or ask in natural language.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="mood" className="data-[state=active]:bg-pink-600">
            <Brain className="mr-2 h-4 w-4" /> Mood-Based
          </TabsTrigger>
          <TabsTrigger value="personalized" className="data-[state=active]:bg-pink-600">
            <Heart className="mr-2 h-4 w-4" /> Personalized
          </TabsTrigger>
          <TabsTrigger value="natural" className="data-[state=active]:bg-pink-600">
            <Search className="mr-2 h-4 w-4" /> Natural Language
          </TabsTrigger>
        </TabsList>
        
        {/* Mood-based recommendations tab */}
        <TabsContent value="mood" className="space-y-6">
          <Card className="bg-[#1e293b] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">How are you feeling today?</CardTitle>
              <CardDescription className="text-gray-400">
                Select a mood and we'll recommend movies that match your emotional state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {MOODS.map(mood => (
                  <Button
                    key={mood}
                    variant={selectedMood === mood ? "default" : "outline"}
                    className={`h-auto py-3 ${selectedMood === mood ? 'bg-pink-600 hover:bg-pink-700' : 'border-gray-600 hover:border-pink-500'}`}
                    onClick={() => handleMoodSelection(mood)}
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={generateMoodRecommendations}
                disabled={!selectedMood || isProcessing}
              >
                {isProcessing && activeTab === 'mood' ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing your mood...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Mood Recommendations
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Personalized recommendations tab */}
        <TabsContent value="personalized" className="space-y-6">
          <Card className="bg-[#1e293b] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Personalized Experience</CardTitle>
              <CardDescription className="text-gray-400">
                Select your preferences and we'll curate a list just for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-white mb-3">Favorite Genres</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {GENRES.map(genre => (
                    <Badge
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className={`cursor-pointer py-1.5 px-3 ${
                        selectedGenres.includes(genre) 
                          ? 'bg-pink-600 hover:bg-pink-700' 
                          : 'bg-transparent border border-gray-600 hover:border-pink-500'
                      }`}
                      onClick={() => handleGenreSelection(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white mb-3">Movie Length (minutes)</h4>
                <Slider
                  defaultValue={lengthPreference}
                  min={60}
                  max={240}
                  step={10}
                  onValueChange={setLengthPreference}
                  className="mb-2"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>{lengthPreference[0]} min</span>
                  <span>{lengthPreference[1]} min</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-white mb-3">Minimum Rating</h4>
                <Slider
                  defaultValue={[ratingThreshold]}
                  min={1}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setRatingThreshold(value[0])}
                  className="mb-2"
                />
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Rating: {ratingThreshold.toFixed(1)}/10</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={generatePersonalizedRecommendations}
                disabled={selectedGenres.length === 0 || isProcessing}
              >
                {isProcessing && activeTab === 'personalized' ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Generating recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Personalized Recommendations
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Natural language search tab */}
        <TabsContent value="natural" className="space-y-6">
          <Card className="bg-[#1e293b] border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Ask in Natural Language</CardTitle>
              <CardDescription className="text-gray-400">
                Describe what you're looking for in your own words.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Input
                    placeholder="E.g., 'Show me sci-fi movies with plot twists' or 'Something like Inception but more romantic'"
                    value={naturalLanguageQuery}
                    onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                    className="bg-[#0f172a] border-gray-700 text-white pl-10 py-6"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <div className="text-gray-400 text-sm">
                  <p>Try these examples:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Movies with unexpected endings released after 2010</li>
                    <li>Feel-good comedies for a rainy day</li>
                    <li>Intense thrillers similar to Se7en</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={handleNaturalLanguageSearch}
                disabled={!naturalLanguageQuery.trim() || isProcessing}
              >
                {isProcessing && activeTab === 'natural' ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Processing your request...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Search with AI
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Recommendations display */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
            AI-Powered Recommendations
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.map(movie => (
              <div key={movie.id} className="bg-[#1e293b] rounded-lg overflow-hidden border border-gray-800 transition-all hover:border-pink-500">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={movie.posterPath}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {movie.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-bold truncate">{movie.title}</h4>
                  <p className="text-gray-400 text-sm">{movie.year}</p>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">{movie.overview}</p>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-500 hover:text-green-400 p-0"
                      onClick={() => handleFeedback(movie.id, true)}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-400 p-0"
                      onClick={() => handleFeedback(movie.id, false)}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 