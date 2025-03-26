"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Play, 
  Star, 
  Clock, 
  ChevronRight,
  Loader,
  Plus,
  Info,
  Sparkles,
  Search,
  Film,
  TrendingUp
} from 'lucide-react';
import ActivityFeed from '@/components/activity/ActivityFeed';
import { mockMovies } from '@/services/mockData';
import SimilarContentRecommendations from '@/components/SimilarContentRecommendations';
import PersonalizedRecommendations from '@/components/recommendations/PersonalizedRecommendations';

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

interface MoodRecommendation {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration?: string;
}

export default function RootPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodRecommendations, setMoodRecommendations] = useState<MoodRecommendation[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  useEffect(() => {
    // Set a random featured movie for all users
    if (mockMovies && mockMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, mockMovies.length));
      const selectedMovie = mockMovies[randomIndex];
      
      if (selectedMovie) {
        setFeaturedMovie(selectedMovie);
      }
    }
  }, []);

  useEffect(() => {
    // Clear any existing authentication state
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
      document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "profile-completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    // Set trending movies (excluding featured movie)
    if (mockMovies && mockMovies.length > 0) {
      const trending = mockMovies
        .filter(movie => movie.id !== featuredMovie?.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      setTrendingMovies(trending);
    }
  }, [featuredMovie]);

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
    
    const recommendations: Record<string, MoodRecommendation[]> = {
      'Happy': [
        { id: 1, title: 'The Grand Budapest Hotel', genre: 'Comedy', rating: 8.1, duration: '1h 40m' },
        { id: 2, title: 'La La Land', genre: 'Musical', rating: 8.0, duration: '2h 8m' },
        { id: 3, title: 'Toy Story', genre: 'Animation', rating: 8.3, duration: '1h 21m' },
      ],
      'Sad': [
        { id: 4, title: 'The Shawshank Redemption', genre: 'Drama', rating: 9.3 },
        { id: 5, title: 'The Green Mile', genre: 'Drama', rating: 8.6 },
        { id: 6, title: 'Schindler&apos;s List', genre: 'Biography', rating: 8.9 },
      ],
      'Angry': [
        { id: 7, title: 'John Wick', genre: 'Action', rating: 7.4 },
        { id: 8, title: 'The Dark Knight', genre: 'Action', rating: 9.0 },
        { id: 9, title: 'Mad Max: Fury Road', genre: 'Action', rating: 8.1 },
      ],
      'Romantic': [
        { id: 10, title: 'Pride & Prejudice', genre: 'Romance', rating: 7.8 },
        { id: 11, title: 'The Notebook', genre: 'Romance', rating: 7.8 },
        { id: 12, title: 'Before Sunrise', genre: 'Romance', rating: 8.1 },
      ],
      'Surprised': [
        { id: 13, title: 'Inception', genre: 'Sci-Fi', rating: 8.8 },
        { id: 14, title: 'The Sixth Sense', genre: 'Thriller', rating: 8.1 },
        { id: 15, title: 'The Prestige', genre: 'Mystery', rating: 8.5 },
      ],
      'Thoughtful': [
        { id: 16, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6 },
        { id: 17, title: 'The Matrix', genre: 'Sci-Fi', rating: 8.7 },
        { id: 18, title: 'Arrival', genre: 'Sci-Fi', rating: 7.9 },
      ],
    };
    
    if (mood === selectedMood) {
      setMoodRecommendations([]);
    } else {
      const moodRecs = recommendations[mood];
      setMoodRecommendations(moodRecs || []);
    }
  };

  const handleCustomPromptSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    
    // Simulate fetching recommendations based on custom prompt
    setMoodRecommendations([
      { id: 101, title: 'Custom Recommendation 1', genre: 'Based on your prompt', rating: 8.5 },
      { id: 102, title: 'Custom Recommendation 2', genre: 'Based on your prompt', rating: 7.9 },
      { id: 103, title: 'Custom Recommendation 3', genre: 'Based on your prompt', rating: 8.2 },
    ]);
    
    // Clear selected mood when using custom prompt
    setSelectedMood(null);
  };

  // Function to handle sign in navigation
  const handleSignIn = () => {
    router.push('/sign-in');
  };

  // Function to handle sign up navigation
  const handleSignUp = () => {
    router.push('/sign-up');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <Loader className="h-10 w-10 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading CineFlix...</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        {/* Hero Section */}
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-backdrop.jpg')] bg-cover bg-center"></div>
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                Unlimited <span className="text-pink-500">Movies</span>, TV shows, and more.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Track, discover, and share your movie journey with friends. Get personalized recommendations and never miss a must-watch film again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 py-7 px-8 text-lg rounded-full"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-transparent border-2 border-white hover:bg-white/10 text-white py-7 px-8 text-lg rounded-full"
                  onClick={handleSignUp}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Movies Preview */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Popular on <span className="text-pink-500">CineFlix</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
        
        {/* Features Section */}
        <div className="container mx-auto px-4 py-16 border-t border-gray-800">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Movie Lovers Choose <span className="text-pink-500">CineFlix</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 mx-auto">
                <Film className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Track Your Movies</h3>
              <p className="text-gray-400 text-center">
                Keep a record of every movie you&apos;ve watched and want to watch. Never forget a film again.
              </p>
            </div>
            
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 mx-auto">
                <Star className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Rate & Review</h3>
              <p className="text-gray-400 text-center">
                Share your thoughts and ratings with the community. Help others discover great films.
              </p>
            </div>
            
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Discover New Films</h3>
              <p className="text-gray-400 text-center">
                Get personalized recommendations based on your taste and viewing history.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 py-6 px-10 text-lg rounded-full"
              onClick={handleSignUp}
            >
              Join CineFlix Today
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      {/* Featured Movie */}
      {featuredMovie && (
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <Image 
            src={featuredMovie.backdropPath} 
            alt={featuredMovie.title}
            fill
            className="object-cover"
            priority
          />
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{featuredMovie.title}</h1>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-white mr-3">{featuredMovie.rating}/10</span>
                <span className="text-gray-400 mr-3">{featuredMovie.year}</span>
                {featuredMovie.genres && featuredMovie.genres.map((genre, index) => (
                  <span key={index} className="text-gray-400">
                    {index > 0 && ", "}
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 line-clamp-3">{featuredMovie.overview}</p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Play className="h-4 w-4 mr-2" /> Play Now
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add to Watchlist
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                  <Info className="h-4 w-4 mr-2" /> More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Trending Movies */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <Link href="/discover" className="text-pink-500 hover:text-pink-400 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingMovies.slice(0, 5).map((movie) => (
            <div key={movie.id} className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
              <Image 
                src={movie.posterPath} 
                alt={movie.title} 
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                width={300}
                height={450}
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
      
      {/* Personalized Recommendations */}
      <PersonalizedRecommendations />
      
      {/* Similar Content Recommendations */}
      <SimilarContentRecommendations 
        title="Recommended For You" 
        description="Based on your viewing history and preferences"
      />
      
      {/* AI Mood Recommendations */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1e293b] rounded-xl border border-gray-800 p-6">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
            <h2 className="text-2xl font-bold text-white">What&apos;s your mood today?</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {['Happy', 'Sad', 'Angry', 'Romantic', 'Surprised', 'Thoughtful'].map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                className={selectedMood === mood 
                  ? "bg-pink-600 hover:bg-pink-700 text-white border-0" 
                  : "border-gray-700 text-gray-300 hover:text-white"
                }
                onClick={() => handleMoodSelection(mood)}
              >
                {mood}
              </Button>
            ))}
          </div>
          
          <div className="mb-6">
            <form onSubmit={handleCustomPromptSubmit} className="flex gap-3">
              <input
                type="text"
                placeholder="Type a custom prompt (e.g., &apos;Movies like Inception&apos;)"
                className="flex-1 bg-[#0f172a] border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>
          </div>
          
          {moodRecommendations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white mb-4">
                {selectedMood ? `${selectedMood} Mood Recommendations` : 'Custom Recommendations'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {moodRecommendations.map((movie) => (
                  <div key={movie.id} className="bg-[#0f172a] rounded-lg p-4 flex items-center">
                    <div className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center mr-4">
                      <Film className="h-6 w-6 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold">{movie.title}</h4>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-2">{movie.genre}</span>
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{movie.rating}</span>
                        {movie.duration && (
                          <>
                            <span className="mx-2">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{movie.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Activity Feed */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Friend Activity</h2>
          <Link href="/friends" className="text-pink-500 hover:text-pink-400 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ActivityFeed />
      </div>
    </div>
  );
}