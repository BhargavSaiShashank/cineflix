"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Film, 
  Star, 
  Heart, 
  Award, 
  Calendar, 
  BarChart3, 
  Settings, 
  Edit,
  TrendingUp,
  Trophy
} from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Define achievement type
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  
  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: 'first-review',
      name: 'Critic in the Making',
      description: 'Write your first movie review',
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      unlocked: true,
    },
    {
      id: 'movie-marathon',
      name: 'Movie Marathon',
      description: 'Watch 5 movies in a single day',
      icon: <Film className="h-5 w-5 text-blue-500" />,
      unlocked: true,
    },
    {
      id: 'genre-explorer',
      name: 'Genre Explorer',
      description: 'Watch movies from 10 different genres',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      unlocked: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: 'cinephile',
      name: 'Cinephile',
      description: 'Watch 100 movies',
      icon: <Trophy className="h-5 w-5 text-purple-500" />,
      unlocked: false,
      progress: 42,
      maxProgress: 100,
    },
    {
      id: 'director-fan',
      name: 'Director Fan',
      description: 'Watch 5 movies from the same director',
      icon: <Award className="h-5 w-5 text-pink-500" />,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
  ];
  
  // Mock viewing statistics
  const viewingStats = {
    totalMoviesWatched: 42,
    totalHoursWatched: 84,
    favoriteGenre: 'Sci-Fi',
    averageRating: 4.2,
    reviewsWritten: 12,
    watchlistCount: 28,
  };
  
  // Mock genre distribution
  const genreDistribution = [
    { genre: 'Sci-Fi', percentage: 30 },
    { genre: 'Action', percentage: 25 },
    { genre: 'Drama', percentage: 15 },
    { genre: 'Comedy', percentage: 10 },
    { genre: 'Horror', percentage: 10 },
    { genre: 'Other', percentage: 10 },
  ];
  
  // Mock recently watched
  const recentlyWatched = mockMovies.slice(0, 5);
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to view your profile</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-pink-500">
              <AvatarImage src={user.avatarUrl || ''} alt={user.name} />
              <AvatarFallback className="text-4xl bg-pink-600 text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-pink-600 hover:bg-pink-700"
            >
              <Edit className="h-4 w-4 text-white" />
            </Button>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400 mb-4">Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-pink-500/20 text-pink-500 border-pink-500">
                Movie Enthusiast
              </Badge>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500">
                Sci-Fi Lover
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-500 border-purple-500">
                Top Reviewer
              </Badge>
            </div>
          </div>
          
          <div className="ml-auto flex gap-2">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-[#1e293b]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-pink-500">Overview</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-pink-500">Activity</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-pink-500">Achievements</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-pink-500">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Summary */}
              <Card className="bg-[#1e293b] border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-pink-500" />
                    Your Stats
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your movie watching statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Movies Watched</span>
                      <span className="font-bold">{viewingStats.totalMoviesWatched}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Hours Watched</span>
                      <span className="font-bold">{viewingStats.totalHoursWatched}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Reviews Written</span>
                      <span className="font-bold">{viewingStats.reviewsWritten}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Watchlist</span>
                      <span className="font-bold">{viewingStats.watchlistCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Favorite Genre</span>
                      <span className="font-bold">{viewingStats.favoriteGenre}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Achievements */}
              <Card className="bg-[#1e293b] border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-pink-500" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your latest movie milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.filter(a => a.unlocked).slice(0, 3).map(achievement => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{achievement.name}</h4>
                          <p className="text-sm text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-white/10">
                      View All Achievements
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Genre Distribution */}
              <Card className="bg-[#1e293b] border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Film className="h-5 w-5 mr-2 text-pink-500" />
                    Genre Breakdown
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your movie genre preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {genreDistribution.map(item => (
                      <div key={item.genre} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">{item.genre}</span>
                          <span className="font-bold">{item.percentage}%</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recently Watched */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recently Watched</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {recentlyWatched.map(movie => (
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
                      <Badge className="bg-pink-600">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                        {movie.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-bold truncate">{movie.title}</h3>
                      <p className="text-gray-300 text-sm">Watched 3 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Activity Feed</h2>
              
              <div className="space-y-6">
                {/* Activity items */}
                <div className="flex gap-4 pb-6 border-b border-gray-800">
                  <div className="h-12 w-12 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center">
                    <Star className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-white">
                      You rated <span className="font-bold">Inception</span> 
                      <Badge className="ml-2 bg-pink-600">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" />
                        4.5
                      </Badge>
                    </p>
                    <p className="text-sm text-gray-400">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-6 border-b border-gray-800">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                    <Film className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white">
                      You watched <span className="font-bold">The Dark Knight</span>
                    </p>
                    <p className="text-sm text-gray-400">3 days ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-6 border-b border-gray-800">
                  <div className="h-12 w-12 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-white">
                      You added <span className="font-bold">Interstellar</span> to your watchlist
                    </p>
                    <p className="text-sm text-gray-400">5 days ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-6 border-b border-gray-800">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-white">
                      You earned the <span className="font-bold">Movie Marathon</span> achievement
                    </p>
                    <p className="text-sm text-gray-400">1 week ago</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-white/10">
                  Load More Activity
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-0">
            <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Your Achievements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`border rounded-xl p-4 flex gap-4 ${
                      achievement.unlocked 
                        ? 'border-pink-500 bg-pink-500/10' 
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <div className={`h-16 w-16 rounded-full flex-shrink-0 flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-pink-500/20' 
                        : 'bg-gray-700/30'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <Badge className="bg-green-600">Unlocked</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / (achievement.maxProgress || 1)) * 100} 
                            className="h-2" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1e293b] border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-pink-500" />
                    Viewing Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                      <h3 className="text-4xl font-bold text-pink-500">{viewingStats.totalMoviesWatched}</h3>
                      <p className="text-gray-400">Total Movies Watched</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                        <h3 className="text-2xl font-bold text-pink-500">{viewingStats.totalHoursWatched}</h3>
                        <p className="text-gray-400">Hours Watched</p>
                      </div>
                      <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                        <h3 className="text-2xl font-bold text-pink-500">{viewingStats.averageRating}</h3>
                        <p className="text-gray-400">Avg. Rating</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                        <h3 className="text-2xl font-bold text-pink-500">{viewingStats.reviewsWritten}</h3>
                        <p className="text-gray-400">Reviews</p>
                      </div>
                      <div className="text-center p-4 bg-[#0f172a] rounded-lg">
                        <h3 className="text-2xl font-bold text-pink-500">{viewingStats.watchlistCount}</h3>
                        <p className="text-gray-400">Watchlist</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1e293b] border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                    Watching Habits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-white mb-2">Most Active Day</h4>
                      <div className="grid grid-cols-7 gap-1">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div 
                            key={day + i} 
                            className={`h-10 flex items-center justify-center rounded ${
                              i === 5 ? 'bg-pink-500 text-white' : 'bg-[#0f172a] text-gray-400'
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Favorite Time to Watch</h4>
                      <div className="h-32 flex items-end gap-2">
                        {[10, 15, 25, 40, 60, 45, 30, 20].map((height, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className="w-full bg-pink-500/80 rounded-t" 
                              style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-xs text-gray-400">
                              {i + 2}PM
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Viewing Streak</h4>
                      <div className="flex items-center gap-2">
                        <div className="h-16 w-16 rounded-full bg-pink-500/20 flex items-center justify-center">
                          <span className="text-2xl font-bold text-pink-500">7</span>
                        </div>
                        <div>
                          <p className="text-white">7-day streak</p>
                          <p className="text-sm text-gray-400">You&apos;ve watched movies for 7 days in a row!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 