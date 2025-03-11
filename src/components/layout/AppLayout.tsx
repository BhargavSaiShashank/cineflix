"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Film, 
  Heart, 
  User, 
  LogOut,
  Sparkles,
  Users
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect to profile setup if authenticated but profile not completed
    if (!isLoading && isAuthenticated && user && !user.profileCompleted) {
      router.push('/onboarding/profile-setup');
    }
  }, [isLoading, isAuthenticated, router, user]);

  // Function to handle sign in navigation
  const handleSignIn = () => {
    router.push('/sign-in');
  };

  // Function to handle sign up navigation
  const handleSignUp = () => {
    router.push('/sign-up');
  };

  // Update the navigation items to include AI Features
  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: Search },
    { name: 'Movies', href: '/movies', icon: Film },
    { name: 'Collections', href: '/collections', icon: Film },
    { name: 'Friends', href: '/friends', icon: Users },
    { name: 'AI Features', href: '/ai-features', icon: Sparkles },
    { name: 'Watchlist', href: '/watchlist', icon: Heart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="h-12 w-12 animate-spin text-pink-500 mb-4" />
          <p className="text-xl text-gray-400">Loading CineFlix...</p>
        </div>
      </div>
    );
  }

  // Show sign-in page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <div className="bg-[#1e293b]/80 rounded-xl border border-gray-800 p-8 shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Access Required</h1>
          <p className="text-gray-400 mb-8 text-center">Please sign in to access this content</p>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 py-6 text-lg"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <div className="text-center">
              <p className="text-gray-400">Don't have an account?</p>
              <button 
                onClick={handleSignUp}
                className="text-pink-500 hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4 md:pb-4 md:pt-20">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 