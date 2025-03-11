"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Search, Film, Brain, MessageSquare, Wand } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

export default function AIFeaturesPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate random recommendations from mock data
      const randomRecommendations = [...mockMovies]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      
      setRecommendations(randomRecommendations);
      setIsGenerating(false);
    }, 1500);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Please sign in to access AI features</p>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Sparkles className="h-8 w-8 text-pink-500 mr-3" />
          <h1 className="text-3xl font-bold text-white">AI Features</h1>
        </div>
        
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-[#1e293b]">
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-pink-500">
              <Film className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-pink-500">
              <Brain className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Movie Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-pink-500">
              <MessageSquare className="h-4 w-4 mr-2 md:mr-2" />
              <span className="hidden md:inline">Movie Chat</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="mt-0">
            <Card className="bg-[#1e293b] border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand className="h-5 w-5 mr-2 text-pink-500" />
                  AI Movie Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePromptSubmit} className="mb-8">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Describe what kind of movie you're in the mood for..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="pl-10 bg-[#0f172a] border-gray-700 text-white"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6"
                      disabled={isGenerating}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      {isGenerating ? 'Generating...' : 'Get Recommendations'}
                    </Button>
                  </div>
                </form>
                
                {isGenerating ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Our AI is finding the perfect movies for you...</p>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Your Personalized Recommendations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {recommendations.map(movie => (
                        <div key={movie.id} className="relative group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg"></div>
                          <Image 
                            src={movie.posterPath} 
                            alt={movie.title} 
                            className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                            width={500}
                            height={750}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <h3 className="text-white font-bold truncate">{movie.title}</h3>
                            <div className="flex items-center mt-1">
                              <span className="text-pink-500 text-sm font-bold">{movie.rating}</span>
                              <span className="mx-1 text-gray-500">•</span>
                              <span className="text-gray-300 text-sm">{movie.year}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Get AI-Powered Recommendations</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Describe what you're in the mood for, and our AI will suggest the perfect movies for you.
                    </p>
                    <p className="text-gray-500 text-sm">Try: "A mind-bending sci-fi like Inception" or "Something uplifting with great music"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <Card className="bg-[#1e293b] border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-pink-500" />
                  AI Movie Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Movie Analysis Coming Soon</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Our AI will soon be able to analyze movies, identify themes, and provide insights into your favorite films.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <Card className="bg-[#1e293b] border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-pink-500" />
                  Movie Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Movie Chat Coming Soon</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Chat with our AI about movies, get recommendations, and discuss your favorite films.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 