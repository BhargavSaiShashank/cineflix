"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, MessageCircle, Clock, Eye, ChevronRight, Filter, MoreHorizontal } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

// Mock activity data
const activityData = [
  {
    id: 1,
    user: {
      name: 'Emma Watson',
      username: 'emmawatson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    type: 'rating',
    movie: {
      id: 1,
      title: 'Inception',
      posterPath: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      year: '2010',
    },
    rating: 4.5,
    timestamp: '2 hours ago',
    likes: 24,
    comments: 3,
  },
  {
    id: 2,
    user: {
      name: 'Tom Holland',
      username: 'tomholland',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    type: 'watched',
    movie: {
      id: 3,
      title: 'The Dark Knight',
      posterPath: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      year: '2008',
    },
    review: "Absolutely mind-blowing performance by Heath Ledger. One of the best superhero movies ever made!",
    timestamp: '5 hours ago',
    likes: 56,
    comments: 12,
  },
  {
    id: 3,
    user: {
      name: 'Zendaya',
      username: 'zendaya',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
    type: 'watchlist',
    movie: {
      id: 10,
      title: 'Parasite',
      posterPath: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      year: '2019',
    },
    timestamp: '1 day ago',
    likes: 18,
    comments: 2,
  },
  {
    id: 4,
    user: {
      name: 'Chris Evans',
      username: 'chrisevans',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    type: 'favorite',
    movie: {
      id: 11,
      title: 'The Godfather',
      posterPath: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      year: '1972',
    },
    timestamp: '2 days ago',
    likes: 87,
    comments: 9,
  },
];

// Filter options
const filterOptions = [
  { value: 'all', label: 'All Activity' },
  { value: 'rating', label: 'Ratings' },
  { value: 'watched', label: 'Watched' },
  { value: 'watchlist', label: 'Watchlist' },
  { value: 'favorite', label: 'Favorites' },
];

interface ActivityItemProps {
  activity: typeof activityData[0];
  onLike: (id: number) => void;
  onComment: (id: number) => void;
}

const ActivityItem = ({ activity, onLike, onComment }: ActivityItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="p-3 border-b border-gray-800 last:border-b-0 hover:bg-black/20 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* User avatar */}
        <Link href={`/user/${activity.user.username}`} className="shrink-0">
          <Avatar className="h-8 w-8 ring-1 ring-gray-700 hover:ring-primary transition-all">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Activity header */}
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <Link href={`/user/${activity.user.username}`} className="font-medium text-gray-300 hover:text-white">
              {activity.user.name}
            </Link>
            
            <span className="text-gray-500">
              {activity.type === 'rating' && 'rated'}
              {activity.type === 'watched' && 'watched'}
              {activity.type === 'watchlist' && 'added to watchlist'}
              {activity.type === 'favorite' && 'favorited'}
            </span>
            
            {activity.type === 'rating' && (
              <div className="inline-flex items-center">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="font-medium ml-0.5 text-gray-300">{activity.rating}</span>
              </div>
            )}
            
            {activity.type === 'watched' && (
              <Eye className="h-3 w-3 text-purple-400" />
            )}
            
            {activity.type === 'watchlist' && (
              <Clock className="h-3 w-3 text-blue-400" />
            )}
            
            {activity.type === 'favorite' && (
              <Heart className="h-3 w-3 text-red-400" />
            )}
            
            <Link href={`/movies/${activity.movie.id}`} className="font-medium text-gray-300 hover:text-white truncate">
              {activity.movie.title}
            </Link>
            <span className="text-gray-500 whitespace-nowrap">({activity.movie.year})</span>
          </div>
          
          {/* Review content if available */}
          {activity.review && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover:line-clamp-2">{activity.review}</p>
          )}
          
          {/* Activity timestamp and actions */}
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-500">{activity.timestamp}</div>
            
            <div className={`flex items-center gap-3 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                onClick={() => onLike(activity.id)} 
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                <Heart className="h-3 w-3" />
                <span>{activity.likes}</span>
              </button>
              
              <button 
                onClick={() => onComment(activity.id)} 
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-3 w-3" />
                <span>{activity.comments}</span>
              </button>
              
              <button className="text-gray-400 hover:text-gray-300">
                <MoreHorizontal className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Movie poster thumbnail that appears on hover */}
        <div className={`shrink-0 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link href={`/movies/${activity.movie.id}`}>
            <div className="relative h-12 w-8 rounded overflow-hidden">
              <Image
                src={activity.movie.posterPath}
                alt={activity.movie.title}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');
  const [liked, setLiked] = useState<number[]>([]);
  
  const handleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter(likedId => likedId !== id));
    } else {
      setLiked([...liked, id]);
    }
  };
  
  const handleComment = (id: number) => {
    // In a real app, this would open a comment modal or navigate to comments
    console.log(`Open comments for activity ${id}`);
  };
  
  const filteredActivities = filter === 'all' 
    ? activityData 
    : activityData.filter(activity => activity.type === filter);
  
  return (
    <div className="w-full bg-black/10 rounded-lg overflow-hidden border border-gray-800">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-base font-medium text-gray-300">Recent Activity</h2>
        
        <div className="relative group">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs text-gray-400 hover:text-gray-300"
          >
            <Filter className="h-3 w-3 mr-1" />
            {filterOptions.find(option => option.value === filter)?.label}
          </Button>
          
          <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`block w-full text-left px-3 py-1.5 text-xs ${
                  filter === option.value ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            No {filter !== 'all' ? filterOptions.find(option => option.value === filter)?.label.toLowerCase() : 'activity'} to show
          </div>
        )}
      </div>
      
      <div className="px-4 py-2 border-t border-gray-800 flex justify-between items-center">
        <Link 
          href="/activity" 
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center"
        >
          View all activity
          <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
        
        <span className="text-xs text-gray-500">{filteredActivities.length} items</span>
      </div>
    </div>
  );
};

export default ActivityFeed; 