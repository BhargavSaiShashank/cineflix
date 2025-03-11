"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the movie type for the watchlist
interface WatchlistMovie {
  id: number;
  title: string;
  posterPath: string;
  addedAt: number; // timestamp
  reminderSent?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

// Define the context type
interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: Omit<WatchlistMovie, 'addedAt'>) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  setPriority: (movieId: number, priority: 'low' | 'medium' | 'high') => void;
  getUnwatchedReminders: () => WatchlistMovie[];
  markReminderSent: (movieId: number) => void;
}

// Create the context
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Create the provider component
export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error parsing watchlist from localStorage', error);
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add a movie to the watchlist
  const addToWatchlist = (movie: Omit<WatchlistMovie, 'addedAt'>) => {
    setWatchlist(prev => {
      // Check if movie is already in watchlist
      if (prev.some(item => item.id === movie.id)) {
        return prev;
      }
      
      // Add movie with current timestamp
      return [...prev, { ...movie, addedAt: Date.now() }];
    });
  };

  // Remove a movie from the watchlist
  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Check if a movie is in the watchlist
  const isInWatchlist = (movieId: number) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  // Set priority for a movie
  const setPriority = (movieId: number, priority: 'low' | 'medium' | 'high') => {
    setWatchlist(prev => 
      prev.map(movie => 
        movie.id === movieId ? { ...movie, priority } : movie
      )
    );
  };

  // Get movies that should trigger reminders (added more than 7 days ago and no reminder sent)
  const getUnwatchedReminders = () => {
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    
    return watchlist.filter(movie => {
      const isOld = (now - movie.addedAt) > sevenDaysMs;
      return isOld && !movie.reminderSent;
    });
  };

  // Mark a reminder as sent
  const markReminderSent = (movieId: number) => {
    setWatchlist(prev => 
      prev.map(movie => 
        movie.id === movieId ? { ...movie, reminderSent: true } : movie
      )
    );
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      setPriority,
      getUnwatchedReminders,
      markReminderSent
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

// Custom hook to use the watchlist context
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
} 