"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Search, Film, Brain, MessageSquare, Wand, User, Send, Info } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { getChatResponse, analyzeMovie, getMovieRecommendations } from '@/utils/ai';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactMarkdown from 'react-markdown';

export default function AIFeaturesPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof mockMovies>([]);
  const [recommendationText, setRecommendationText] = useState('');
  
  // Movie Analysis States
  const [selectedMovie, setSelectedMovie] = useState(mockMovies[0]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [movieAnalysis, setMovieAnalysis] = useState('');
  
  // Movie Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      content: "Hello! I'm your movie AI assistant. I can help you discover new films, discuss your favorites, or answer questions about cinema. What would you like to talk about today?"
    }
  ]);
  const [isSending, setIsSending] = useState(false);
  
  // Chat container ref for auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isSending]);
  
  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    try {
      setIsGenerating(true);
      setRecommendations([]);
      setRecommendationText('');
      
      try {
        // Get AI recommendations based on the prompt
        const { movies, recommendationsText } = await getMovieRecommendations(prompt);
        
        // For now, we'll still use mock data for the UI
        // In a real implementation, you would parse the AI response and display actual recommendations
        const randomRecommendations = [...mockMovies]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        
        setRecommendations(randomRecommendations);
        setRecommendationText(recommendationsText);
      } catch (error) {
        console.error('Error getting movie recommendations:', error);
        setRecommendationText('Sorry, I encountered an error while getting recommendations. Please try again later.');
        // Show error message if needed
      } finally {
        setIsGenerating(false);
      }
    } catch (outerError) {
      console.error('Unexpected error in recommendations:', outerError);
      setIsGenerating(false);
    }
  };
  
  // Handle movie selection for analysis
  const handleMovieSelect = async (movie: typeof mockMovies[0]) => {
    setSelectedMovie(movie);
    
    try {
      setShowAnalysis(false);
      setIsAnalyzing(true);
      setMovieAnalysis('');
      
      try {
        // Get AI analysis of the movie
        const analysis = await analyzeMovie(movie.title, movie.overview);
        setMovieAnalysis(analysis);
        setShowAnalysis(true);
      } catch (error) {
        console.error('Error analyzing movie:', error);
        setMovieAnalysis("I'm sorry, I encountered an error while analyzing this movie. Please try again later.");
        setShowAnalysis(true);
      } finally {
        setIsAnalyzing(false);
      }
    } catch (outerError) {
      console.error('Unexpected error in movie analysis:', outerError);
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }
  };
  
  // Handle chat message submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    try {
      // Add user message
      const newUserMessage = {
        sender: 'user',
        content: chatInput
      };
      
      setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
      const userQuestion = chatInput;
      setChatInput('');
      setIsSending(true);
      
      try {
        // Get AI response using our utility function
        const aiResponseText = await getChatResponse(userQuestion);
        
        // Add AI response to chat
        const aiResponse = {
          sender: 'ai',
          content: aiResponseText
        };
        
        setChatMessages(prevMessages => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Add error message
        const errorResponse = {
          sender: 'ai',
          content: "I'm sorry, I encountered an error while processing your request. Please try again later."
        };
        
        setChatMessages(prevMessages => [...prevMessages, errorResponse]);
      } finally {
        setIsSending(false);
      }
    } catch (outerError) {
      console.error('Unexpected error in chat submission:', outerError);
      setIsSending(false);
      // Show a toast or notification here if needed
    }
  };
  
  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question);
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
          <span className="ml-3 px-2 py-1 text-xs bg-pink-500/20 text-pink-400 rounded-full">Free AI Models</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-2 text-gray-400 hover:text-white">
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-gray-800 text-white border-gray-700">
                <p>CineFlix uses free AI models from Hugging Face with a smart fallback system. No API keys or paid services required!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                    
                    {/* AI Recommendation Text */}
                    {recommendationText && (
                      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Sparkles className="h-5 w-5 text-pink-500 mr-2" />
                          <h4 className="text-lg font-medium text-white">AI Suggestions</h4>
                        </div>
                        <div className="text-gray-300 prose prose-invert prose-pink max-w-none">
                          {recommendationText ? (
                            <ReactMarkdown>{recommendationText}</ReactMarkdown>
                          ) : (
                            <p>No recommendations available. Please try a different query.</p>
                          )}
                        </div>
                      </div>
                    )}
                    
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
                      Describe what you&apos;re in the mood for, and our AI will suggest the perfect movies for you.
                    </p>
                    <p className="text-gray-500 text-sm">Try: &quot;A mind-bending sci-fi like Inception&quot; or &quot;Something uplifting with great music&quot;</p>
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
                {/* Movie Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-200 mb-3">Select a movie to analyze:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {mockMovies.slice(0, 6).map(movie => (
                      <div 
                        key={movie.id} 
                        className={`relative group cursor-pointer ${selectedMovie.id === movie.id ? 'ring-2 ring-pink-500 rounded-lg' : ''}`}
                        onClick={() => handleMovieSelect(movie)}
                      >
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

                {/* Analysis Results */}
                {isAnalyzing ? (
                  <div className="mt-8 text-center py-12">
                    <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing {selectedMovie.title}...</p>
                  </div>
                ) : showAnalysis ? (
                <div className="mt-8 border-t border-gray-800 pt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Analysis for {selectedMovie.title} ({selectedMovie.year})</h3>
                  
                  <div className="space-y-6">
                    {/* AI Analysis */}
                    <div className="bg-gray-800/30 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Sparkles className="h-5 w-5 text-pink-500 mr-2" />
                        <h4 className="text-lg font-medium text-white">AI Analysis</h4>
                      </div>
                      <div className="text-gray-300 prose prose-invert prose-pink max-w-none">
                        {movieAnalysis ? (
                          <ReactMarkdown>{movieAnalysis}</ReactMarkdown>
                        ) : (
                          <p>No analysis available for this movie.</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Movie Info */}
                    <div>
                      <h4 className="text-lg font-medium text-pink-500 mb-2">Movie Information</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedMovie.genres?.map((genre, index) => (
                          <Badge key={index} className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-gray-300">
                        {selectedMovie.overview}
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div>
                      <h4 className="text-lg font-medium text-pink-500 mb-2">Rating</h4>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${selectedMovie.rating * 10}%` }}></div>
                          </div>
                          <span className="ml-2 text-pink-500">{selectedMovie.rating}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                  <div className="mt-8 text-center py-12">
                    <Brain className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Select a Movie to Analyze</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Choose a movie from the selection above to see an in-depth AI analysis of its themes, characters, and cinematic elements.
                    </p>
                  </div>
                )}
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
                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="mb-4 h-[400px] overflow-y-auto border border-gray-800 rounded-lg p-4 bg-[#0f172a]"
                >
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={message.sender === 'user' ? 'bg-pink-500/20 rounded-lg p-3 max-w-[80%]' : 'bg-gray-800 rounded-lg p-3 max-w-[80%]'}>
                          <p className="text-white">{message.content || 'No message content'}</p>
                        </div>
                        <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3 hidden' : 'ml-3'}`}>
                          <div className={message.sender === 'user' ? 'w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center' : 'w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center'}>
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4 text-gray-300" />
                            ) : (
                              <Sparkles className="h-4 w-4 text-pink-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Loading indicator */}
                    {isSending && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Ask about any movie or director..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                  <Button 
                    type="submit"
                    className="ml-2 bg-pink-500 hover:bg-pink-600"
                    disabled={isSending}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
                
                {/* Suggested Questions */}
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300" onClick={() => handleSuggestedQuestion("What are the best sci-fi movies of the last decade?")}>
                      What are the best sci-fi movies of the last decade?
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300" onClick={() => handleSuggestedQuestion("Who are the most influential directors in cinema history?")}>
                      Who are the most influential directors in cinema history?
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs border-gray-700 text-gray-300" onClick={() => handleSuggestedQuestion("Recommend movies similar to The Matrix")}>
                      Recommend movies similar to The Matrix
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 