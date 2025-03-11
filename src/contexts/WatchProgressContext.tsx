"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define watch progress type
export type WatchProgress = {
  movieId: number;
  progress: number; // 0-100 percentage
  timestamp: number; // Last watched timestamp
  duration: number; // Total duration in seconds
};

// Define context type
type WatchProgressContextType = {
  watchProgress: Record<number, WatchProgress>;
  updateProgress: (movieId: number, progress: number, duration: number) => void;
  getProgress: (movieId: number) => WatchProgress | null;
  getContinueWatchingList: () => WatchProgress[];
  removeFromWatchProgress: (movieId: number) => void;
};

// Create context with default values
const WatchProgressContext = createContext<WatchProgressContextType>({
  watchProgress: {},
  updateProgress: () => {},
  getProgress: () => null,
  getContinueWatchingList: () => [],
  removeFromWatchProgress: () => {},
});

// Custom hook to use watch progress context
export const useWatchProgress = () => useContext(WatchProgressContext);

export const WatchProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchProgress, setWatchProgress] = useState<Record<number, WatchProgress>>({});

  // Load watch progress from localStorage on initial load
  useEffect(() => {
    const storedProgress = localStorage.getItem("watchProgress");
    if (storedProgress) {
      try {
        setWatchProgress(JSON.parse(storedProgress));
      } catch (error) {
        console.error("Failed to parse watch progress:", error);
        localStorage.removeItem("watchProgress");
      }
    }
  }, []);

  // Save watch progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchProgress", JSON.stringify(watchProgress));
  }, [watchProgress]);

  // Update progress for a movie
  const updateProgress = (movieId: number, progress: number, duration: number) => {
    setWatchProgress(prev => ({
      ...prev,
      [movieId]: {
        movieId,
        progress: Math.min(Math.max(progress, 0), 100), // Ensure progress is between 0-100
        timestamp: Date.now(),
        duration,
      }
    }));
  };

  // Get progress for a specific movie
  const getProgress = (movieId: number): WatchProgress | null => {
    return watchProgress[movieId] || null;
  };

  // Get list of movies in continue watching, sorted by most recent
  const getContinueWatchingList = (): WatchProgress[] => {
    return Object.values(watchProgress)
      .filter(item => item.progress > 0 && item.progress < 95) // Only include movies not finished
      .sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent
  };

  // Remove a movie from watch progress
  const removeFromWatchProgress = (movieId: number) => {
    setWatchProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[movieId];
      return newProgress;
    });
  };

  return (
    <WatchProgressContext.Provider
      value={{
        watchProgress,
        updateProgress,
        getProgress,
        getContinueWatchingList,
        removeFromWatchProgress,
      }}
    >
      {children}
    </WatchProgressContext.Provider>
  );
};

export default WatchProgressProvider; 