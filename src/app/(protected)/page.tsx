"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Film, TrendingUp, Award, Clock, Search, Star, Heart, Loader } from 'lucide-react';
import ActivityFeed from '@/components/activity/ActivityFeed';

// Only use default export
export default function ProtectedHome() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-pink-500">
              {isLoading ? (
                <Loader className="inline-block h-8 w-8 animate-spin" />
              ) : (
                user?.name || 'Movie Fan'
              )}
            </span>!
          </h1>
          <p className="text-xl text-gray-400">
            Track, discover, and share your movie journey
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Link href="/discover">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all">
              <Film className="h-6 w-6 text-pink-500" />
              <span className="text-white">Discover Movies</span>
            </Button>
          </Link>
          <Link href="/trending">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all">
              <TrendingUp className="h-6 w-6 text-pink-500" />
              <span className="text-white">Trending Now</span>
            </Button>
          </Link>
          <Link href="/watchlist">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all">
              <Clock className="h-6 w-6 text-pink-500" />
              <span className="text-white">Your Watchlist</span>
            </Button>
          </Link>
          <Link href="/top-rated">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-[#1e293b] border-gray-700 hover:bg-[#2d3748] hover:border-pink-500 transition-all">
              <Award className="h-6 w-6 text-pink-500" />
              <span className="text-white">Top Rated</span>
            </Button>
          </Link>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                View All
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
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader className="h-8 w-8 text-pink-500 animate-spin" />
                </div>
              ) : (
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
              )}
              <div className="mt-6">
                <Link href="/profile">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0">
                    View Full Stats
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Recommended For You</h3>
              <p className="text-gray-400 mb-4">
                Based on your recent watches and ratings
              </p>
              <div className="space-y-4">
                {/* Placeholder for recommendations */}
                <div className="flex items-center justify-center h-32 bg-[#0f172a]/50 rounded-lg border border-gray-700">
                  <div className="text-center">
                    <Search className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Start rating movies to get personalized recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 