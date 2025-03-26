"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  BellOff, 
  Film, 
  Star, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Mock upcoming releases data
const upcomingReleases = [
  {
    id: 101,
    title: "Upcoming Movie 1",
    releaseDate: "2023-06-15",
    posterPath: mockMovies[0].posterPath,
    overview: "A thrilling new adventure that will keep you on the edge of your seat.",
    genres: ["Action", "Thriller"],
    hasReminder: false,
  },
  {
    id: 102,
    title: "Upcoming Movie 2",
    releaseDate: "2023-06-22",
    posterPath: mockMovies[1].posterPath,
    overview: "The sequel to the blockbuster hit that captivated audiences worldwide.",
    genres: ["Sci-Fi", "Adventure"],
    hasReminder: true,
  },
  {
    id: 103,
    title: "Upcoming Movie 3",
    releaseDate: "2023-07-05",
    posterPath: mockMovies[2].posterPath,
    overview: "A heartwarming story about family, friendship, and finding your way home.",
    genres: ["Drama", "Family"],
    hasReminder: false,
  },
  {
    id: 104,
    title: "Upcoming Movie 4",
    releaseDate: "2023-07-12",
    posterPath: mockMovies[3].posterPath,
    overview: "A comedy that will have you laughing from start to finish.",
    genres: ["Comedy"],
    hasReminder: true,
  },
  {
    id: 105,
    title: "Upcoming Movie 5",
    releaseDate: "2023-07-19",
    posterPath: mockMovies[4].posterPath,
    overview: "A horror film that will keep you up at night.",
    genres: ["Horror", "Thriller"],
    hasReminder: false,
  },
  {
    id: 106,
    title: "Upcoming Movie 6",
    releaseDate: "2023-07-26",
    posterPath: mockMovies[5].posterPath,
    overview: "An epic fantasy adventure in a world of magic and mystery.",
    genres: ["Fantasy", "Adventure"],
    hasReminder: false,
  },
];

// Mock awards data
const awardsEvents = [
  {
    id: 1,
    name: "Academy Awards",
    date: "2023-03-12",
    logo: "/images/oscars-logo.png",
    nominees: mockMovies.slice(0, 5),
  },
  {
    id: 2,
    name: "Golden Globe Awards",
    date: "2023-01-10",
    logo: "/images/golden-globe-logo.png",
    nominees: mockMovies.slice(5, 10),
  },
  {
    id: 3,
    name: "BAFTA Film Awards",
    date: "2023-02-19",
    logo: "/images/bafta-logo.png",
    nominees: mockMovies.slice(2, 7),
  },
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to get days until release
const getDaysUntil = (dateString: string) => {
  const releaseDate = new Date(dateString);
  const today = new Date();
  const diffTime = releaseDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reminders, setReminders] = useState<Record<number, boolean>>(() => {
    const initialReminders: Record<number, boolean> = {};
    upcomingReleases.forEach(movie => {
      initialReminders[movie.id] = movie.hasReminder;
    });
    return initialReminders;
  });
  
  // Toggle reminder for a movie
  const toggleReminder = (movieId: number) => {
    setReminders(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };
  
  // Navigate to previous month
  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  // Navigate to next month
  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // Get current month name and year
  const currentMonthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Filter releases for current month
  const currentMonthReleases = upcomingReleases.filter(movie => {
    const releaseDate = new Date(movie.releaseDate);
    return releaseDate.getMonth() === currentMonth.getMonth() && 
           releaseDate.getFullYear() === currentMonth.getFullYear();
  });
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to view the content calendar</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <CalendarIcon className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Content Calendar</h1>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8 bg-[#1e293b]">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-pink-500">Upcoming</TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-pink-500">Awards Season</TabsTrigger>
            <TabsTrigger value="festivals" className="data-[state=active]:bg-pink-500">Film Festivals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="bg-[#1e293b] rounded-xl border border-gray-800 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white"
                  onClick={previousMonth}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </Button>
                <h2 className="text-2xl font-bold text-white">{currentMonthName}</h2>
                <Button 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white"
                  onClick={nextMonth}
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </div>
              
              {currentMonthReleases.length > 0 ? (
                <div className="space-y-6">
                  {currentMonthReleases.map(movie => {
                    const daysUntil = getDaysUntil(movie.releaseDate);
                    return (
                      <div key={movie.id} className="flex flex-col md:flex-row gap-4 p-4 bg-[#0f172a] rounded-lg">
                        <div className="w-full md:w-40 flex-shrink-0">
                          <Image 
                            src={movie.posterPath} 
                            alt={movie.title} 
                            className="w-full aspect-[2/3] object-cover rounded-lg"
                            width={160}
                            height={240}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <Badge className="bg-pink-600 mr-2">
                                {formatDate(movie.releaseDate)}
                              </Badge>
                              {daysUntil > 0 ? (
                                <Badge variant="outline" className="border-gray-700 text-gray-300">
                                  {daysUntil} days left
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-green-700 text-green-500">
                                  Released
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {movie.genres.map(genre => (
                              <Badge key={genre} variant="outline" className="bg-[#1e293b]/50 text-gray-300 border-gray-700">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-gray-300 mb-4">{movie.overview}</p>
                          <div className="flex justify-between items-center">
                            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                              <Film className="h-4 w-4 mr-2" /> View Details
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="text-gray-300 hover:text-white"
                              onClick={() => toggleReminder(movie.id)}
                            >
                              {reminders[movie.id] ? (
                                <>
                                  <BellOff className="h-4 w-4 mr-2" /> Remove Reminder
                                </>
                              ) : (
                                <>
                                  <Bell className="h-4 w-4 mr-2" /> Set Reminder
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No releases this month</h3>
                  <p className="text-gray-400 mb-6">
                    There are no scheduled movie releases for {currentMonthName}.
                  </p>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Browse All Upcoming Releases
                  </Button>
                </div>
              )}
            </div>
            
            <div className="bg-[#1e293b] rounded-xl border border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Your Reminders</h2>
              
              {Object.entries(reminders).some(([, hasReminder]) => hasReminder) ? (
                <div className="space-y-4">
                  {Object.entries(reminders)
                    .filter(([, hasReminder]) => hasReminder)
                    .map(([movieId]) => {
                      const movie = upcomingReleases.find(m => m.id === parseInt(movieId));
                      if (!movie) return null;
                      
                      return (
                        <div key={movie.id} className="flex items-center gap-4 p-4 bg-[#0f172a] rounded-lg">
                          <Image 
                            src={movie.posterPath} 
                            alt={movie.title} 
                            className="w-12 h-16 object-cover rounded"
                            width={48}
                            height={64}
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-white">{movie.title}</h3>
                            <p className="text-gray-400 text-sm">
                              Releasing on {formatDate(movie.releaseDate)}
                            </p>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => toggleReminder(movie.id)}
                          >
                            <BellOff className="h-5 w-5" />
                          </Button>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">No reminders set</h3>
                  <p className="text-gray-400">
                    You haven&apos;t set any reminders for upcoming releases yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="awards">
            <div className="space-y-8">
              {awardsEvents.map(event => (
                <Card key={event.id} className="bg-[#1e293b] border-gray-800 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                      <div className="w-24 h-24 bg-[#0f172a] rounded-lg flex items-center justify-center">
                        {/* Replace with actual logo if available */}
                        <CalendarIcon className="h-12 w-12 text-pink-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{event.name}</h2>
                        <p className="text-gray-300 mb-4">{formatDate(event.date)}</p>
                        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                          <Bell className="h-4 w-4 mr-2" /> Set Reminder
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">Nominees</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {event.nominees.map(movie => (
                        <div key={movie.id} className="relative group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
                          <Image 
                            src={movie.posterPath} 
                            alt={movie.title} 
                            className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                            width={200}
                            height={300}
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="festivals">
            <div className="text-center py-16">
              <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Our film festivals calendar is currently being updated. Check back soon for information on upcoming film festivals around the world.
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                Get Notified When Available
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 