"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Film, Clock, Star, Award, Calendar, BarChart3, PieChart, TrendingUp, Heart } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

// Mock user statistics data
const userStats = {
  totalMoviesWatched: 127,
  totalHoursWatched: 254,
  averageRating: 3.8,
  favoriteGenres: [
    { name: 'Sci-Fi', count: 32 },
    { name: 'Drama', count: 28 },
    { name: 'Action', count: 24 },
    { name: 'Comedy', count: 18 },
    { name: 'Horror', count: 12 },
  ],
  watchingStreak: 14, // days
  topDirectors: [
    { name: 'Christopher Nolan', count: 7 },
    { name: 'Quentin Tarantino', count: 6 },
    { name: 'Steven Spielberg', count: 5 },
  ],
  recentActivity: [
    { type: 'watched', title: 'Inception', date: '2 days ago' },
    { type: 'rated', title: 'The Dark Knight', rating: 4.5, date: '3 days ago' },
    { type: 'added', title: 'Interstellar', list: 'Favorites', date: '5 days ago' },
  ],
  achievements: [
    { 
      id: 'movie-buff', 
      name: 'Movie Buff', 
      description: 'Watched 100+ movies', 
      completed: true,
      progress: 100,
      icon: <Film className="h-4 w-4" />
    },
    { 
      id: 'marathon', 
      name: 'Marathon Runner', 
      description: 'Watched 10+ movies in a week', 
      completed: true,
      progress: 100,
      icon: <TrendingUp className="h-4 w-4" />
    },
    { 
      id: 'critic', 
      name: 'Film Critic', 
      description: 'Rated 50+ movies', 
      completed: false,
      progress: 72,
      icon: <Star className="h-4 w-4" />
    },
    { 
      id: 'collector', 
      name: 'Collector', 
      description: 'Added 25+ movies to favorites', 
      completed: false,
      progress: 68,
      icon: <Heart className="h-4 w-4" />
    },
    { 
      id: 'dedicated', 
      name: 'Dedicated Fan', 
      description: 'Maintained a 14-day watching streak', 
      completed: true,
      progress: 100,
      icon: <Calendar className="h-4 w-4" />
    },
  ],
  level: 8,
  nextLevelProgress: 65,
};

// Helper function to get color based on completion percentage
const getProgressColor = (percentage: number) => {
  if (percentage < 30) return 'error';
  if (percentage < 70) return 'warning';
  return 'success';
};

const UserStats = () => {
  return (
    <div className="w-full space-y-6">
      {/* User Level and Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Level {userStats.level} Cinephile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>{userStats.nextLevelProgress}%</span>
              </div>
              <Progress value={userStats.nextLevelProgress} indicatorColor="gradient" className="h-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/5"
              >
                <Film className="h-5 w-5 mb-1 text-blue-400" />
                <span className="text-xl font-bold">{userStats.totalMoviesWatched}</span>
                <span className="text-xs text-gray-400">Movies Watched</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/5"
              >
                <Clock className="h-5 w-5 mb-1 text-green-400" />
                <span className="text-xl font-bold">{userStats.totalHoursWatched}</span>
                <span className="text-xs text-gray-400">Hours Watched</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/5"
              >
                <Star className="h-5 w-5 mb-1 text-yellow-400" />
                <span className="text-xl font-bold">{userStats.averageRating}</span>
                <span className="text-xs text-gray-400">Average Rating</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex flex-col items-center p-3 bg-black/30 rounded-lg border border-white/5"
              >
                <Calendar className="h-5 w-5 mb-1 text-purple-400" />
                <span className="text-xl font-bold">{userStats.watchingStreak}</span>
                <span className="text-xs text-gray-400">Day Streak</span>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStats.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "p-3 rounded-lg border",
                    achievement.completed 
                      ? "border-yellow-500/50 bg-yellow-500/10" 
                      : "border-white/5 bg-black/30"
                  )}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "p-2 rounded-full mr-3",
                      achievement.completed ? "bg-yellow-500/20" : "bg-gray-700/50"
                    )}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.name}</h4>
                        {achievement.completed && (
                          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{achievement.completed ? 'Completed' : 'In Progress'}</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress 
                          value={achievement.progress} 
                          indicatorColor={achievement.completed ? "success" : getProgressColor(achievement.progress)} 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Favorite Genres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-500" />
              Favorite Genres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats.favoriteGenres.map((genre, index) => (
                <motion.div 
                  key={genre.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{genre.name}</span>
                    <span>{genre.count} movies</span>
                  </div>
                  <Progress 
                    value={(genre.count / userStats.totalMoviesWatched) * 100} 
                    indicatorColor={index === 0 ? "gradient" : "default"} 
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Top Directors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
              Top Directors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats.topDirectors.map((director, index) => (
                <motion.div 
                  key={director.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{director.name}</span>
                    <span>{director.count} movies</span>
                  </div>
                  <Progress 
                    value={(director.count / 10) * 100} 
                    indicatorColor={index === 0 ? "gradient" : "default"} 
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserStats; 