"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Sparkles, Star, Film, Users, Heart, Clock, BarChart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FeaturesPage() {
  const features = [
    {
      icon: Film,
      title: 'Movie Recommendations',
      description: 'Get personalized movie recommendations based on your watch history and preferences.',
      bgColor: 'bg-pink-500/20',
      textColor: 'text-pink-500',
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Rate movies and write reviews to share your thoughts with the community.',
      bgColor: 'bg-yellow-500/20',
      textColor: 'text-yellow-500',
    },
    {
      icon: Heart,
      title: 'Favorites',
      description: 'Save your favorite movies to easily access them later.',
      bgColor: 'bg-red-500/20',
      textColor: 'text-red-500',
    },
    {
      icon: Clock,
      title: 'Watchlist',
      description: 'Keep track of movies you want to watch in the future.',
      bgColor: 'bg-blue-500/20',
      textColor: 'text-blue-500',
    },
    {
      icon: Users,
      title: 'Social Features',
      description: 'Follow friends and see what they\'re watching and recommending.',
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-500',
    },
    {
      icon: BarChart,
      title: 'Stats & Insights',
      description: 'View detailed statistics about your movie watching habits.',
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-500',
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Sparkles className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">Features</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#1e293b] border border-gray-800 rounded-xl p-6 hover:border-pink-500 transition-all"
            >
              <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 mr-2" />
            <h2 className="text-2xl font-bold">Coming Soon</h2>
          </div>
          <p className="text-white/80 mb-6">
            We&apos;re constantly working on new features to enhance your movie experience. 
            Stay tuned for upcoming features like advanced filtering, movie quizzes, and more!
          </p>
          <Link href="/">
            <Button className="bg-white text-pink-600 hover:bg-gray-100">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
} 