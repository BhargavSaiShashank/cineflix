"use client";

import React, { useState, useEffect } from 'react';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Star, 
  Play, 
  Trash2, 
  Flag, 
  ArrowUpDown,
  Bell
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export default function WatchlistPage() {
  const { 
    watchlist, 
    removeFromWatchlist, 
    setPriority, 
    getUnwatchedReminders,
    markReminderSent
  } = useWatchlist();
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Check for reminders on page load
  useEffect(() => {
    const reminders = getUnwatchedReminders();
    
    if (reminders.length > 0) {
      // Show toast notification for unwatched movies
      toast({
        title: "Don't forget your watchlist!",
        description: `You have ${reminders.length} movies you saved but haven't watched yet.`,
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setActiveTab('reminders')}
          >
            View
          </Button>
        ),
      });
      
      // Mark reminders as sent
      reminders.forEach(movie => markReminderSent(movie.id));
    }
  }, []);

  // Sort and filter watchlist based on current settings
  const getSortedWatchlist = () => {
    let filtered = [...watchlist];
    
    // Filter based on active tab
    if (activeTab === 'high') {
      filtered = filtered.filter(movie => movie.priority === 'high');
    } else if (activeTab === 'medium') {
      filtered = filtered.filter(movie => movie.priority === 'medium');
    } else if (activeTab === 'low') {
      filtered = filtered.filter(movie => movie.priority === 'low');
    } else if (activeTab === 'reminders') {
      filtered = getUnwatchedReminders();
    }
    
    // Sort based on sort setting
    if (sortBy === 'date') {
      filtered.sort((a, b) => b.addedAt - a.addedAt);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1, undefined: 0 };
      filtered.sort((a, b) => 
        (priorityOrder[b.priority || 'undefined'] || 0) - 
        (priorityOrder[a.priority || 'undefined'] || 0)
      );
    }
    
    return filtered;
  };

  const sortedWatchlist = getSortedWatchlist();
  
  // Get priority badge color
  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Get priority label
  const getPriorityLabel = (priority?: 'low' | 'medium' | 'high') => {
    return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'None';
  };

  // Calculate days since added
  const getDaysSinceAdded = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
          <p className="text-gray-400 mt-1">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved to watch later
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by: {sortBy === 'date' ? 'Date Added' : 'Priority'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1e293b] border-gray-700 text-white">
              <DropdownMenuItem 
                className={sortBy === 'date' ? 'bg-pink-500/10 text-pink-500' : ''}
                onClick={() => setSortBy('date')}
              >
                Date Added
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={sortBy === 'priority' ? 'bg-pink-500/10 text-pink-500' : ''}
                onClick={() => setSortBy('priority')}
              >
                Priority
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1e293b] border-b border-gray-800 w-full justify-start mb-6 rounded-none overflow-x-auto">
          <TabsTrigger value="all" className="data-[state=active]:text-pink-500">
            All
          </TabsTrigger>
          <TabsTrigger value="high" className="data-[state=active]:text-pink-500">
            High Priority
          </TabsTrigger>
          <TabsTrigger value="medium" className="data-[state=active]:text-pink-500">
            Medium Priority
          </TabsTrigger>
          <TabsTrigger value="low" className="data-[state=active]:text-pink-500">
            Low Priority
          </TabsTrigger>
          <TabsTrigger value="reminders" className="data-[state=active]:text-pink-500">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {sortedWatchlist.length === 0 ? (
            <div className="text-center py-12 bg-[#1e293b]/50 rounded-lg border border-gray-800">
              <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
              <p className="text-gray-400 mb-6">
                {activeTab === 'all' 
                  ? "You haven't added any movies to your watchlist yet." 
                  : `You don't have any ${activeTab === 'reminders' ? 'reminders' : `${activeTab} priority movies`} in your watchlist.`}
              </p>
              {activeTab !== 'all' && (
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300"
                  onClick={() => setActiveTab('all')}
                >
                  View All Movies
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedWatchlist.map(movie => (
                <div 
                  key={movie.id} 
                  className="bg-[#1e293b] rounded-lg overflow-hidden border border-gray-800 flex"
                >
                  <div className="w-1/3 relative">
                    <Link href={`/movies/${movie.id}`}>
                      <Image 
                        src={movie.posterPath} 
                        alt={movie.title}
                        width={150}
                        height={225}
                        className="object-cover h-full w-full"
                      />
                    </Link>
                  </div>
                  
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link href={`/movies/${movie.id}`} className="hover:text-pink-500">
                          <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>
                        </Link>
                        
                        <Badge className={`${getPriorityColor(movie.priority)} text-white`}>
                          {getPriorityLabel(movie.priority)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm mt-2">
                        Added {getDaysSinceAdded(movie.addedAt)}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Link href={`/movies/${movie.id}`}>
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white">
                          <Play className="h-4 w-4 mr-1" /> Watch
                        </Button>
                      </Link>
                      
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 px-2">
                              <Flag className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#1e293b] border-gray-700 text-white">
                            <DropdownMenuItem onClick={() => setPriority(movie.id, 'high')}>
                              High Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriority(movie.id, 'medium')}>
                              Medium Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setPriority(movie.id, 'low')}>
                              Low Priority
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 text-red-400 hover:text-red-300 hover:border-red-400 px-2"
                          onClick={() => removeFromWatchlist(movie.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 