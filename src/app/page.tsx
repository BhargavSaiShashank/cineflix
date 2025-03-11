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
  TrendingUp, 
  Heart, 
  Search, 
  Film, 
  ChevronRight,
  Loader,
  Award,
  Plus,
  Info,
  Sparkles
} from 'lucide-react';
import ActivityFeed from '@/components/activity/ActivityFeed';
import { mockMovies } from '@/services/mockData';

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
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  // Add explicit type annotation for user in a comment to satisfy the linter
  // The user variable is of type User | null
  
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodRecommendations, setMoodRecommendations] = useState<MoodRecommendation[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>('');

  useEffect(() => {
    // Clear any existing authentication state
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
      document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "profile-completed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    // Set a random featured movie for all users
    if (mockMovies && mockMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, mockMovies.length));
      const selectedMovie = mockMovies[randomIndex];
      
      if (selectedMovie) {
        setFeaturedMovie(selectedMovie);
        
        // Set trending movies (excluding featured movie)
        const trending = mockMovies
          .filter(movie => movie.id !== selectedMovie.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        setTrendingMovies(trending);
      }
    }
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Featured Movie Hero */}
      {featuredMovie && (
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredMovie.posterPath})` }}
          ></div>
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <div className="max-w-2xl">
              <div className="flex items-center mb-4">
                <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">FEATURED</span>
                <span className="text-gray-300 text-sm">{featuredMovie.year}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
                {featuredMovie.title}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-pink-500/20 px-2 py-1 rounded">
                  <Star className="h-4 w-4 text-pink-500 mr-1" />
                  <span className="text-white font-bold">{featuredMovie.rating}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-300">Action, Adventure</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-300">2h 15m</span>
              </div>
              <p className="text-gray-300 mb-6 text-lg max-w-xl">
                {featuredMovie.overview}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6">
                  <Play className="h-5 w-5 mr-2" /> Watch Trailer
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-6">
                  <Plus className="h-5 w-5 mr-2" /> Add to Watchlist
                </Button>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 rounded-full px-6">
                  <Info className="h-5 w-5 mr-2" /> More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link href="/discover">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all rounded-xl">
              <Film className="h-6 w-6 text-pink-500" />
              <span className="text-white">Discover Movies</span>
            </Button>
          </Link>
          <Link href="/trending">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all rounded-xl">
              <TrendingUp className="h-6 w-6 text-pink-500" />
              <span className="text-white">Trending Now</span>
            </Button>
          </Link>
          <Link href="/watchlist">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all rounded-xl">
              <Clock className="h-6 w-6 text-pink-500" />
              <span className="text-white">Your Watchlist</span>
            </Button>
          </Link>
          <Link href="/top-rated">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all rounded-xl">
              <Award className="h-6 w-6 text-pink-500" />
              <span className="text-white">Top Rated</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Continue Watching Section */}
      <div className="container mx-auto px-4 py-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
          <Link href="/history" className="text-pink-500 hover:text-pink-400 flex items-center">
            <span>View All</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockMovies.slice(0, 5).map((movie) => (
            <div key={`continue-${movie.id}`} className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
              <Image 
                src={movie.posterPath} 
                alt={movie.title} 
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                width={500}
                height={750}
              />
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 z-20">
                <div 
                  className="h-full bg-pink-500" 
                  style={{ width: `${Math.floor(Math.random() * 90 + 10)}%` }}
                ></div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-bold truncate">{movie.title}</h3>
                <div className="flex items-center mt-1">
                  <Button variant="ghost" className="h-8 w-8 p-0 rounded-full bg-pink-500/80 hover:bg-pink-500">
                    <Play className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mood/Emotion Prompt Section */}
      <div className="container mx-auto px-4 py-6 mb-4">
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-2xl border border-gray-800 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">What&apos;s your mood today?</h2>
          
          {/* Custom Prompt Input */}
          <form onSubmit={handleCustomPromptSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Type a custom prompt (e.g., &apos;Movies like Inception&apos;)"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Recommendations
              </Button>
            </div>
          </form>
          
          <p className="text-gray-400 mb-6">Or choose a mood for instant recommendations:</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Button 
              className={`bg-gradient-to-br from-yellow-500 to-orange-600 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Happy' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Happy')}
            >
              <span className="text-3xl">😊</span>
              <span>Happy</span>
            </Button>
            
            <Button 
              className={`bg-gradient-to-br from-blue-500 to-indigo-600 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Sad' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Sad')}
            >
              <span className="text-3xl">😢</span>
              <span>Sad</span>
            </Button>
            
            <Button 
              className={`bg-gradient-to-br from-red-500 to-pink-600 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Angry' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Angry')}
            >
              <span className="text-3xl">😡</span>
              <span>Angry</span>
            </Button>
            
            <Button 
              className={`bg-gradient-to-br from-purple-500 to-pink-600 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Romantic' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Romantic')}
            >
              <span className="text-3xl">🥰</span>
              <span>Romantic</span>
            </Button>
            
            <Button 
              className={`bg-gradient-to-br from-green-500 to-teal-600 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Surprised' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Surprised')}
            >
              <span className="text-3xl">😲</span>
              <span>Surprised</span>
            </Button>
            
            <Button 
              className={`bg-gradient-to-br from-gray-700 to-gray-900 hover:opacity-90 text-white border-0 h-20 rounded-xl flex flex-col items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 ${selectedMood === 'Thoughtful' ? 'ring-4 ring-white scale-105' : ''}`}
              onClick={() => handleMoodSelection('Thoughtful')}
            >
              <span className="text-3xl">🤔</span>
              <span>Thoughtful</span>
            </Button>
          </div>
          
          {/* Mood Recommendations */}
          {moodRecommendations.length > 0 && (
            <div className="mt-8 bg-[#1a2234] rounded-xl p-4">
              <h3 className="text-xl font-bold text-white mb-4">
                {selectedMood ? `${selectedMood} Movies for You` : 'Recommendations Based on Your Prompt'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {moodRecommendations.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="bg-[#0f172a] rounded-lg p-4 border border-gray-800 hover:border-pink-500 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{movie.title}</h4>
                      <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                        {movie.rating}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{movie.genre}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{movie.duration || '2h 15m'}</span>
                      <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-400 p-0">
                        <Play className="h-4 w-4 mr-1" /> Watch
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Trending Now */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <Link href="/trending">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingMovies.slice(0, 6).map((movie) => (
            <div key={movie.id} className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
              <Image 
                src={movie.posterPath} 
                alt={movie.title} 
                className="w-full aspect-[2/3] object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
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
              <div className="absolute top-2 right-2 z-20">
                <div className="bg-pink-500 px-2 py-1 rounded-full text-xs text-white font-bold">
                  HOT
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 shadow-lg overflow-hidden">
              <ActivityFeed />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-3">
                    <Film className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Movies Watched</p>
                    <p className="text-2xl font-bold text-white">{user?.moviesWatched || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Reviews Written</p>
                    <p className="text-2xl font-bold text-white">{user?.reviewsWritten || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Watchlist</p>
                    <p className="text-2xl font-bold text-white">{user?.watchlistCount || 0}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/profile">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-full">
                    View Full Stats
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Recommended For You</h3>
              <p className="text-gray-400 mb-4">
                Based on your preferences
              </p>
              <div className="space-y-4">
                {mockMovies.slice(5, 8).map((movie) => (
                  <div key={movie.id} className="flex items-start space-x-3 group cursor-pointer">
                    <div className="relative w-16 h-24">
                      <Image 
                        src={movie.posterPath} 
                        alt={movie.title}
                        fill
                        className="object-cover rounded transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-pink-500 transition-colors">{movie.title}</h4>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-pink-500 mr-1" />
                        <span className="text-white text-xs">{movie.rating}</span>
                        <span className="mx-1 text-gray-500">•</span>
                        <span className="text-gray-300 text-xs">{movie.year}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-400 p-0 h-auto mt-2">
                        + Add to Watchlist
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}