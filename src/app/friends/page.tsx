"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Film, 
  Star, 
  Heart, 
  UserPlus, 
  Users, 
  Search, 
  MessageSquare,
  Bell,
  Eye,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Mock friend data
interface Friend {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  lastActive?: string;
  recentlyWatched?: typeof mockMovies;
  mutualFriends?: number;
  favoriteGenre?: string;
}

export default function FriendsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock friends data
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      username: 'alexj',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      isOnline: true,
      recentlyWatched: mockMovies.slice(0, 3),
      mutualFriends: 5,
      favoriteGenre: 'Sci-Fi',
    },
    {
      id: '2',
      name: 'Sarah Williams',
      username: 'sarahw',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      isOnline: false,
      lastActive: '2 hours ago',
      recentlyWatched: mockMovies.slice(3, 6),
      mutualFriends: 3,
      favoriteGenre: 'Drama',
    },
    {
      id: '3',
      name: 'Michael Chen',
      username: 'mikec',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      isOnline: true,
      recentlyWatched: mockMovies.slice(6, 9),
      mutualFriends: 8,
      favoriteGenre: 'Action',
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      username: 'emmar',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
      isOnline: false,
      lastActive: '1 day ago',
      recentlyWatched: mockMovies.slice(2, 5),
      mutualFriends: 2,
      favoriteGenre: 'Comedy',
    },
  ];
  
  // Mock friend suggestions
  const friendSuggestions: Friend[] = [
    {
      id: '5',
      name: 'David Kim',
      username: 'davidk',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
      isOnline: false,
      mutualFriends: 4,
      favoriteGenre: 'Horror',
    },
    {
      id: '6',
      name: 'Jessica Lee',
      username: 'jessical',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
      isOnline: true,
      mutualFriends: 6,
      favoriteGenre: 'Romance',
    },
    {
      id: '7',
      name: 'Ryan Patel',
      username: 'ryanp',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      isOnline: false,
      mutualFriends: 3,
      favoriteGenre: 'Thriller',
    },
  ];
  
  // Mock activity feed
  const activityFeed = [
    {
      id: '1',
      user: friends[0],
      action: 'watched',
      movie: mockMovies[0],
      timestamp: '1 hour ago',
    },
    {
      id: '2',
      user: friends[1],
      action: 'rated',
      movie: mockMovies[3],
      rating: 4.5,
      timestamp: '3 hours ago',
    },
    {
      id: '3',
      user: friends[2],
      action: 'added to watchlist',
      movie: mockMovies[6],
      timestamp: '5 hours ago',
    },
    {
      id: '4',
      user: friends[0],
      action: 'reviewed',
      movie: mockMovies[1],
      review: 'Absolutely loved this movie! The cinematography was stunning.',
      timestamp: '1 day ago',
    },
  ];
  
  // Filter friends based on search query
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to view your friends</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Friends & Social</h1>
          
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Friends
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-[#1e293b]">
            <TabsTrigger value="friends" className="data-[state=active]:bg-pink-500">
              <Users className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Friends</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-pink-500">
              <Film className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="discover" className="data-[state=active]:bg-pink-500">
              <UserPlus className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Discover</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="mt-0">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text" 
                  placeholder="Search friends..." 
                  className="pl-10 bg-[#1e293b] border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFriends.map(friend => (
                <Card key={friend.id} className="bg-[#1e293b] border-gray-800 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 flex gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                          <AvatarFallback className="bg-pink-600 text-white">
                            {friend.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1e293b] ${
                          friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-white">{friend.name}</h3>
                            <p className="text-gray-400">@{friend.username}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline" className="bg-pink-500/20 text-pink-500 border-pink-500">
                            {friend.favoriteGenre}
                          </Badge>
                          <span className="text-gray-400 text-sm">{friend.mutualFriends} mutual friends</span>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm text-gray-400">
                            {friend.isOnline ? 'Online now' : `Last active ${friend.lastActive}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {friend.recentlyWatched && (
                      <div className="border-t border-gray-800 p-4">
                        <p className="text-sm text-gray-400 mb-2">Recently watched:</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {friend.recentlyWatched.map(movie => (
                            <div key={movie.id} className="flex-shrink-0 w-16">
                              <Image 
                                src={movie.posterPath} 
                                alt={movie.title} 
                                className="w-full aspect-[2/3] object-cover rounded-lg"
                                width={200}
                                height={300}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Friend Activity</h2>
              
              <div className="space-y-6">
                {activityFeed.map(activity => (
                  <div key={activity.id} className="flex gap-4 pb-6 border-b border-gray-800">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                      <AvatarFallback className="bg-pink-600 text-white">
                        {activity.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white">
                            <span className="font-bold">{activity.user.name}</span> {activity.action}{' '}
                            <span className="font-bold">{activity.movie.title}</span>
                            {activity.action === 'rated' && (
                              <Badge className="ml-2 bg-pink-600">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                {activity.rating}
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">{activity.timestamp}</p>
                          
                          {activity.review && (
                            <div className="mt-2 p-3 bg-[#0f172a] rounded-lg">
                              <p className="text-gray-300 text-sm">{activity.review}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0 w-12 h-18">
                          <Image 
                            src={activity.movie.posterPath} 
                            alt={activity.movie.title} 
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                            width={200}
                            height={300}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white hover:bg-white/10">
                          <Heart className="h-4 w-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white hover:bg-white/10">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white hover:bg-white/10">
                          <Clock className="h-4 w-4 mr-2" />
                          Add to Watchlist
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-white/10">
                  Load More Activity
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="discover" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">People You May Know</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {friendSuggestions.map(suggestion => (
                    <Card key={suggestion.id} className="bg-[#0f172a] border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage src={suggestion.avatarUrl} alt={suggestion.name} />
                            <AvatarFallback className="bg-pink-600 text-white">
                              {suggestion.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="font-bold text-white">{suggestion.name}</h3>
                          <p className="text-gray-400 mb-2">@{suggestion.username}</p>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="bg-pink-500/20 text-pink-500 border-pink-500">
                              {suggestion.favoriteGenre}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-400 mb-4">
                            {suggestion.mutualFriends} mutual friends
                          </p>
                          
                          <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Friend
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Find Friends</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      type="text" 
                      placeholder="Search by name or email..." 
                      className="pl-10 bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-white/10">
                      <Users className="h-5 w-5 mr-2" />
                      Import Contacts
                    </Button>
                    <Button variant="outline" className="h-12 border-gray-700 text-white hover:bg-white/10">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Invite Friends
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1e293b] border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Movie Clubs</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-[#0f172a] border-gray-800">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-white text-lg mb-2">Sci-Fi Enthusiasts</h3>
                      <p className="text-gray-400 mb-3">A club for fans of science fiction cinema</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-[#0f172a]">
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
                              <AvatarFallback className="bg-pink-600 text-white text-xs">
                                {String.fromCharCode(64 + i)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">42 members</span>
                      </div>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                        Join Club
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#0f172a] border-gray-800">
                    <CardContent className="p-4">
                      <h3 className="font-bold text-white text-lg mb-2">Classic Film Buffs</h3>
                      <p className="text-gray-400 mb-3">Discussing the golden age of cinema</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex -space-x-2">
                          {[4, 5, 6].map(i => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-[#0f172a]">
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
                              <AvatarFallback className="bg-pink-600 text-white text-xs">
                                {String.fromCharCode(64 + i)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">28 members</span>
                      </div>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                        Join Club
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 