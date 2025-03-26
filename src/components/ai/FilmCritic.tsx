"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, ChevronDown, SendHorizontal, User } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Message types
type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Critics with different personalities
const CRITICS = [
  { id: 'roger', name: 'Roger Ebert', style: 'Classic film criticism with depth and insight', avatar: '/images/critics/ebert.jpg' },
  { id: 'pauline', name: 'Pauline Kael', style: 'Provocative and passionate analysis', avatar: '/images/critics/kael.jpg' },
  { id: 'modern', name: 'Modern Critic', style: 'Contemporary perspective with cultural context', avatar: '/images/critics/modern.jpg' },
  { id: 'technical', name: 'Technical Analyst', style: 'Focus on cinematography, editing and production', avatar: '/images/critics/technical.jpg' },
];

// Mock responses for different movies/critics (in a real app, this would be AI-generated)
const CRITIC_RESPONSES: Record<string, Record<string, string[]>> = {
  'default': {
    'general': [
      "This film represents an important addition to the director's body of work, showcasing their characteristic visual style while exploring familiar thematic territory.",
      "The cinematography deserves special mention, with striking compositions that enhance the narrative rather than distract from it.",
      "While the pacing occasionally falters in the second act, the strong performances from the ensemble cast maintain engagement throughout.",
      "The screenplay balances exposition and subtext effectively, trusting the audience's intelligence rather than over-explaining its themes."
    ],
    'performance': [
      "The lead performance demonstrates remarkable nuance, conveying complex emotions through subtle facial expressions and physical presence.",
      "Supporting characters are well-developed, avoiding stereotypes and contributing meaningfully to the protagonist's journey.",
      "The chemistry between the principal cast creates authentic relationship dynamics that ground the film's more ambitious elements."
    ],
    'technical': [
      "The director's visual approach employs a deliberate color palette that evolves alongside the narrative arc.",
      "Sound design is particularly noteworthy, creating an immersive atmosphere that enhances the viewing experience.",
      "The editing establishes a rhythm that serves the story's emotional beats, knowing when to linger and when to cut."
    ],
    'cultural': [
      "The film engages thoughtfully with contemporary issues without sacrificing artistic integrity for didacticism.",
      "While drawing inspiration from earlier works in this genre, it offers a fresh perspective relevant to today's audience.",
      "Its thematic concerns resonate beyond the specific setting, touching on universal aspects of human experience."
    ]
  }
};

export default function FilmCritic() {
  const [selectedMovie, setSelectedMovie] = useState(mockMovies[0]);
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const [selectedCritic, setSelectedCritic] = useState(CRITICS[0]);
  const [isCriticDropdownOpen, setIsCriticDropdownOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMessage.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      // In a real app, this would call an AI service
      const criticResponses = CRITIC_RESPONSES[selectedMovie.title] || CRITIC_RESPONSES['default'];
      const responsePool = criticResponses['general'] || [];
      
      // Pick random response from pool
      const randomIndex = Math.floor(Math.random() * responsePool.length);
      const responseContent = responsePool[randomIndex];
      
      const aiMessage: Message = {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Film Critic AI
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discuss movies with AI critics who offer expert analysis and insights on any film.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar - Controls */}
        <div className="space-y-6">
          {/* Movie Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">Select a movie:</h3>
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full text-left justify-between border-gray-700 bg-gray-800"
                onClick={() => setIsMovieDropdownOpen(!isMovieDropdownOpen)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-14 relative mr-3 overflow-hidden rounded">
                    <Image 
                      src={selectedMovie.posterPath} 
                      alt={selectedMovie.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="truncate">{selectedMovie.title}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
              
              {isMovieDropdownOpen && (
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  {mockMovies.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsMovieDropdownOpen(false);
                        // Clear messages when changing movie
                        setMessages([]);
                      }}
                    >
                      <div className="w-8 h-12 relative mr-3 overflow-hidden rounded">
                        <Image 
                          src={movie.posterPath} 
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className={`truncate ${movie.id === selectedMovie.id ? "font-medium text-blue-400" : ""}`}>
                        {movie.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Critic Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-3">Choose your critic:</h3>
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full text-left justify-between border-gray-700 bg-gray-800"
                onClick={() => setIsCriticDropdownOpen(!isCriticDropdownOpen)}
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{selectedCritic.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedCritic.name}</div>
                    <div className="text-xs text-gray-400 truncate">{selectedCritic.style}</div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
              </Button>
              
              {isCriticDropdownOpen && (
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  {CRITICS.map((critic) => (
                    <div 
                      key={critic.id} 
                      className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedCritic(critic);
                        setIsCriticDropdownOpen(false);
                      }}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{critic.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={critic.id === selectedCritic.id ? "font-medium text-blue-400" : ""}>{critic.name}</div>
                        <div className="text-xs text-gray-400">{critic.style}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Movie Info Card */}
          <Card className="bg-gray-800/50 border-gray-700 p-4">
            <div className="aspect-[2/3] relative rounded-md overflow-hidden mb-4">
              <Image 
                src={selectedMovie.posterPath} 
                alt={selectedMovie.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-white">{selectedMovie.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{selectedMovie.year}</p>
            <p className="text-gray-300 text-sm line-clamp-4">
              {selectedMovie.overview}
            </p>
          </Card>
          
          {/* Suggested Questions */}
          <div className="space-y-3">
            <h3 className="text-md font-medium text-gray-200">Suggested questions:</h3>
            <div className="space-y-2">
              {[
                `What makes ${selectedMovie.title} significant?`,
                `How would you rate the performances?`,
                `What are the key themes?`,
                `How does it compare to other similar films?`
              ].map((question, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="w-full justify-start border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-left"
                  onClick={() => {
                    setUserMessage(question);
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right side - Chat */}
        <div className="lg:col-span-2 flex flex-col h-[600px] bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
          {/* Chat messages */}
          <div className="flex-1 overflow-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div className="max-w-sm">
                  <Sparkles className="h-12 w-12 mx-auto text-blue-500/50 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Start a conversation with {selectedCritic.name}
                  </h3>
                  <p className="text-gray-400">
                    Ask questions about {selectedMovie.title} or use the suggested questions to begin.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      {msg.role === 'assistant' ? (
                        <Avatar className="h-8 w-8 mr-2 mt-0.5">
                          <AvatarFallback>{selectedCritic.name[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 mt-0.5">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                      
                      <div 
                        className={`p-3 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>{selectedCritic.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <Input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder={`Ask about ${selectedMovie.title}...`}
                className="flex-1 bg-gray-700 border-gray-600 focus-visible:ring-blue-500"
              />
              <Button type="submit" disabled={isTyping || !userMessage.trim()}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}