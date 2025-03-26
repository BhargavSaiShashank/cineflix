"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Brain, Sparkles, Trophy, Lightbulb } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import MovieQuiz from '@/components/quiz/MovieQuiz';
import GuessTheMovie from '@/components/ai/GuessTheMovie';

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState('guess-the-movie');
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Gamepad2 className="h-8 w-8 text-pink-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-white">Movie Games & Quizzes</h1>
            <p className="text-gray-400 mt-1">Test your movie knowledge with our AI-powered games</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with game options */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>Game Center</span>
                </CardTitle>
                <CardDescription>
                  Choose a game to play
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('guess-the-movie')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === 'guess-the-movie' 
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Guess The Movie</div>
                      <div className="text-xs text-gray-500">Identify movies from cryptic clues</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('movie-quiz')}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === 'movie-quiz' 
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Trophy className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Movie Trivia Quiz</div>
                      <div className="text-xs text-gray-500">Test your film knowledge</div>
                    </div>
                  </button>
                  
                  <div className="px-4 py-3 rounded-lg flex items-center gap-3 opacity-60 cursor-not-allowed">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Movie Plot Generator</div>
                      <div className="text-xs text-gray-500">Coming soon...</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Games Played</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">High Score</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Correct Answers</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            {activeTab === 'guess-the-movie' && (
              <GuessTheMovie />
            )}
            
            {activeTab === 'movie-quiz' && (
              <MovieQuiz />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 