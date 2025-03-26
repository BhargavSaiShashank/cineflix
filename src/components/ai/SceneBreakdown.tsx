"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Heart, Camera, Eye, AlertTriangle, ChevronDown, Sparkles } from 'lucide-react';
import { mockMovies } from '@/services/mockData';

// Define Scene interface
interface Scene {
  timestamp: string;
  title: string;
  description: string;
  significance?: string;
  impact?: string;
  musicNotes?: string;
  technique?: string;
  directorNotes?: string;
}

// Define scene types
const SCENE_TYPES = [
  { id: 'key', name: 'Key Scenes', icon: <Clock className="h-5 w-5" /> },
  { id: 'emotional', name: 'Emotional Moments', icon: <Heart className="h-5 w-5" /> },
  { id: 'technical', name: 'Technical Details', icon: <Camera className="h-5 w-5" /> },
  { id: 'hidden', name: 'Hidden Details', icon: <Eye className="h-5 w-5" /> },
  { id: 'warnings', name: 'Warnings', icon: <AlertTriangle className="h-5 w-5" /> }
];
const SCENE_DATA: Record<string, Record<string, Scene[]>> = {
  'default': {
    'key': [
      {
        timestamp: "00:15:23",
        title: "Character Introduction",
        description: "The protagonist is introduced in their ordinary world, establishing their personality and goals.",
        significance: "Sets up character arc and audience expectations"
      },
      {
        timestamp: "00:38:45",
        title: "First Plot Twist",
        description: "Unexpected revelation that changes the direction of the story.",
        significance: "Creates narrative tension and deepens audience engagement"
      },
      {
        timestamp: "01:12:30",
        title: "Midpoint Reversal",
        description: "Major shift in the protagonist's journey as stakes are raised.",
        significance: "Marks transition to higher stakes and greater challenges"
      },
      {
        timestamp: "01:48:10",
        title: "Climactic Confrontation",
        description: "Final showdown between protagonist and antagonistic forces.",
        significance: "Resolves central conflict and tests character growth"
      }
    ],
    'emotional': [
      {
        timestamp: "00:28:15",
        title: "Emotional Breakthrough",
        description: "Character experiences powerful emotional realization.",
        impact: "Creates empathetic connection with audience"
      },
      {
        timestamp: "01:05:22",
        title: "Relationship Moment",
        description: "Key interaction that defines character relationships.",
        impact: "Strengthens audience investment in character dynamics"
      },
      {
        timestamp: "01:35:40",
        title: "Sacrifice Scene",
        description: "Character makes a difficult choice with emotional consequences.",
        impact: "Powerful emotional payoff for character development"
      }
    ],
    'technical': [
      {
        timestamp: "00:12:30",
        title: "Establishing Shot",
        description: "Wide angle establishing the environment and setting tone.",
        technique: "Creates visual context and establishes atmosphere",
        directorNotes: "Uses natural lighting to enhance mood"
      },
      {
        timestamp: "00:45:18",
        title: "Tracking Shot",
        description: "Continuous shot following character movement.",
        technique: "Creates immersion and maintains visual interest",
        musicNotes: "Synchronized musical cue enhances emotional impact"
      },
      {
        timestamp: "01:28:55",
        title: "Montage Sequence",
        description: "Series of quick cuts showing passage of time and character development.",
        technique: "Efficient storytelling technique for time compression",
        directorNotes: "Color grading shifts to reflect emotional journey"
      }
    ],
    'hidden': [
      {
        timestamp: "00:18:22",
        title: "Background Detail",
        description: "Subtle clue or easter egg hidden in the background of a scene.",
        significance: "Foreshadows later plot developments"
      },
      {
        timestamp: "00:52:14",
        title: "Symbolic Imagery",
        description: "Visual metaphor that represents a deeper theme.",
        significance: "Reinforces thematic elements without explicit dialogue"
      }
    ],
    'warnings': [
      {
        timestamp: "00:32:10",
        title: "Intense Scene",
        description: "Scene containing potentially distressing content.",
        significance: "May trigger emotional responses in sensitive viewers"
      },
      {
        timestamp: "01:15:28",
        title: "Thematic Content",
        description: "Scene dealing with challenging subject matter.",
        significance: "Presents complex moral situations that some viewers may find difficult"
      }
    ]
  }
};

export default function SceneBreakdown() {
  const [selectedMovie, setSelectedMovie] = useState(mockMovies[0]);
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('key');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sceneData, setSceneData] = useState<Scene[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Analyze scenes
  const analyzeScenes = (sceneType: string) => {
    setIsAnalyzing(true);
    setActiveTab(sceneType);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an AI service
      const movieScenes = SCENE_DATA[selectedMovie.title] || SCENE_DATA['default'];
      const scenes = movieScenes[sceneType] || [];
      
      setSceneData(scenes);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          AI Scene Breakdown
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover key moments, emotional impacts, and technical details of your favorite films.
        </p>
      </div>
      
      {/* Movie Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-200 mb-3">Select a movie to analyze:</h3>
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
              <span>{selectedMovie.title} ({selectedMovie.year})</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
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
                    setHasAnalyzed(false);
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
                  <span className={movie.id === selectedMovie.id ? "font-medium text-blue-400" : ""}>
                    {movie.title} ({movie.year})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Analysis Types */}
      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {['key', 'emotional', 'technical', 'hidden', 'warnings'].map((type) => {
            const sceneType = SCENE_TYPES.find(t => t.id === type);
            return (
              <Button
                key={type}
                variant={activeTab === type && hasAnalyzed ? "default" : "outline"}
                className={`flex items-center justify-center gap-2 h-auto py-3 ${activeTab === type && hasAnalyzed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 border-gray-700'}`}
                onClick={() => analyzeScenes(type)}
                disabled={isAnalyzing}
              >
                {sceneType?.icon}
                <span>{sceneType?.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Loading State */}
      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="animate-pulse flex items-center justify-center mb-4">
            <Sparkles className="h-16 w-16 text-blue-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">AI is analyzing {selectedMovie.title}...</h3>
          <p className="text-gray-400 max-w-md">
            Our AI is examining the film frame by frame, identifying key scenes and moments.
          </p>
        </div>
      )}
      
      {/* Results */}
      {!isAnalyzing && hasAnalyzed && (
        <div className="space-y-6 mt-6">
          <h3 className="text-xl font-medium text-white">
            {SCENE_TYPES.find(t => t.id === activeTab)?.name} in &quot;{selectedMovie.title}&quot;
          </h3>
          
          {sceneData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No data available for this analysis type.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sceneData.map((scene, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-gray-700 px-2 py-1 rounded-md text-sm font-mono text-gray-300 mr-4">
                        {scene.timestamp}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-white mb-1">{scene.title}</h4>
                        <p className="text-gray-300 mb-3">{scene.description}</p>
                        
                        {scene.significance && (
                          <div className="mt-2">
                            <span className="text-blue-400 text-sm font-medium">Significance:</span>
                            <p className="text-gray-400">{scene.significance}</p>
                          </div>
                        )}
                        
                        {scene.impact && (
                          <div className="mt-2">
                            <span className="text-purple-400 text-sm font-medium">Emotional Impact:</span>
                            <p className="text-gray-400">{scene.impact}</p>
                          </div>
                        )}
                        
                        {scene.technique && (
                          <div className="mt-2">
                            <span className="text-green-400 text-sm font-medium">Technique:</span>
                            <p className="text-gray-400">{scene.technique}</p>
                          </div>
                        )}
                        
                        {scene.musicNotes && (
                          <div className="mt-2">
                            <span className="text-yellow-400 text-sm font-medium">Music Notes:</span>
                            <p className="text-gray-400">{scene.musicNotes}</p>
                          </div>
                        )}
                        
                        {scene.directorNotes && (
                          <div className="mt-2">
                            <span className="text-red-400 text-sm font-medium">Director&apos;s Approach:</span>
                            <p className="text-gray-400">{scene.directorNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Initial State - Not Analyzed Yet */}
      {!isAnalyzing && !hasAnalyzed && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-blue-500/50" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Select a scene analysis type</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Choose one of the analysis options above to have our AI analyze your selected film.
          </p>
        </div>
      )}
    </div>
  );
}