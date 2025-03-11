"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  favoriteGenres?: string[];
  profileCompleted: boolean;
  // User stats
  moviesWatched?: number;
  reviewsWritten?: number;
  watchlistCount?: number;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, callbackUrl?: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Clear auth cookies
  const clearAuthCookies = () => {
    Cookies.remove('auth-token', { path: '/' });
    Cookies.remove('profile-completed', { path: '/' });
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authCookie = Cookies.get('auth-token');
    
    // Check for mismatch between localStorage and cookies
    if (storedUser && !authCookie) {
      // Client thinks user is logged in but no cookie exists
      localStorage.removeItem("user");
      setUser(null);
    } else if (!storedUser && authCookie) {
      // Cookie exists but no user in localStorage
      clearAuthCookies();
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Set auth cookies
  const setAuthCookies = (user: User) => {
    // Set auth token cookie (7 day expiry)
    Cookies.set('auth-token', user.id, { expires: 7, path: '/' });
    
    // Set profile completion status cookie
    Cookies.set('profile-completed', String(user.profileCompleted), { path: '/' });
  };

  // Login function
  const login = async (email: string, password: string, callbackUrl?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        profileCompleted: false,
        // Add mock stats
        moviesWatched: 0,
        reviewsWritten: 0,
        watchlistCount: 0,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setAuthCookies(mockUser);
      
      // Redirect to callback URL if provided, otherwise to home
      if (callbackUrl) {
        try {
          const decodedUrl = decodeURIComponent(callbackUrl);
          router.push(decodedUrl);
        } catch (e) {
          console.error("Error decoding callback URL:", e);
          router.push("/");
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to your backend
      const newUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        profileCompleted: false,
        // Add mock stats
        moviesWatched: 0,
        reviewsWritten: 0,
        watchlistCount: 0,
      };
      
      // Store user data temporarily but don't set as current user
      localStorage.setItem("temp_user", JSON.stringify(newUser));
      
      // Redirect to sign-in page after successful registration
      router.push("/sign-in?registered=true");
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    clearAuthCookies();
    router.push("/sign-in");
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to your backend
      if (user) {
        const updatedUser = {
          ...user,
          ...profileData,
          profileCompleted: true,
        };
        
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setAuthCookies(updatedUser);
        
        // Redirect to home page after profile completion
        router.push("/");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      throw new Error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Compute authentication status
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 