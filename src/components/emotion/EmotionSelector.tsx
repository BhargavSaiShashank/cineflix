"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, Star, Coffee, Moon, Sun, Zap, Music, Film, PartyPopper } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

export type Emotion = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

const emotions: Emotion[] = [
  {
    id: 'happy',
    name: 'Happy',
    icon: <Smile className="h-6 w-6" />,
    description: 'Uplifting and joyful films',
    color: 'bg-yellow-500 text-yellow-950',
  },
  {
    id: 'sad',
    name: 'Sad',
    icon: <Frown className="h-6 w-6" />,
    description: 'Emotional and moving stories',
    color: 'bg-blue-500 text-blue-950',
  },
  {
    id: 'neutral',
    name: 'Thoughtful',
    icon: <Meh className="h-6 w-6" />,
    description: 'Thought-provoking and insightful',
    color: 'bg-gray-500 text-gray-950',
  },
  {
    id: 'romantic',
    name: 'Romantic',
    icon: <Heart className="h-6 w-6" />,
    description: 'Love stories and relationships',
    color: 'bg-pink-500 text-pink-950',
  },
  {
    id: 'excited',
    name: 'Excited',
    icon: <Zap className="h-6 w-6" />,
    description: 'Thrilling and action-packed',
    color: 'bg-orange-500 text-orange-950',
  },
  {
    id: 'relaxed',
    name: 'Relaxed',
    icon: <Coffee className="h-6 w-6" />,
    description: 'Calm and easy-going films',
    color: 'bg-green-500 text-green-950',
  },
  {
    id: 'inspired',
    name: 'Inspired',
    icon: <Star className="h-6 w-6" />,
    description: 'Motivational and uplifting',
    color: 'bg-purple-500 text-purple-950',
  },
  {
    id: 'cozy',
    name: 'Cozy Night',
    icon: <Moon className="h-6 w-6" />,
    description: 'Comfort films for a quiet night',
    color: 'bg-indigo-500 text-indigo-950',
  },
  {
    id: 'family',
    name: 'Family Time',
    icon: <PartyPopper className="h-6 w-6" />,
    description: 'Fun for the whole family',
    color: 'bg-teal-500 text-teal-950',
  },
  {
    id: 'date',
    name: 'Date Night',
    icon: <Film className="h-6 w-6" />,
    description: 'Perfect for couples',
    color: 'bg-red-500 text-red-950',
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    icon: <Music className="h-6 w-6" />,
    description: 'Classics and throwbacks',
    color: 'bg-amber-500 text-amber-950',
  },
  {
    id: 'energetic',
    name: 'Energetic',
    icon: <Sun className="h-6 w-6" />,
    description: 'Upbeat and lively films',
    color: 'bg-lime-500 text-lime-950',
  },
];

interface EmotionSelectorProps {
  onSelect: (emotion: Emotion) => void;
  selectedEmotion?: string;
  className?: string;
}

const EmotionSelector = ({ onSelect, selectedEmotion, className }: EmotionSelectorProps) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const displayedEmotions = showAll ? emotions : emotions.slice(0, 6);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">How are you feeling today?</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowAll(!showAll)}
          className="text-sm"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {displayedEmotions.map((emotion) => (
          <motion.div
            key={emotion.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredEmotion(emotion.id)}
            onMouseLeave={() => setHoveredEmotion(null)}
            onClick={() => onSelect(emotion)}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-colors",
              emotion.color,
              selectedEmotion === emotion.id ? "ring-2 ring-white ring-offset-2 ring-offset-black" : "hover:ring-1 hover:ring-white/50"
            )}
          >
            {emotion.icon}
            <span className="mt-2 font-medium">{emotion.name}</span>
            
            {hoveredEmotion === emotion.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-black/80 backdrop-blur-sm rounded text-xs text-center"
              >
                {emotion.description}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {selectedEmotion && (
        <div className="mt-6 p-4 bg-black/20 backdrop-blur-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {emotions.find(e => e.id === selectedEmotion)?.name} Recommendations
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Here are some movies that match your current mood.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Showing recommendations based on your selection
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSelect(emotions[Math.floor(Math.random() * emotions.length)])}
              className="text-xs"
            >
              Surprise Me
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionSelector; 