"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, ThumbsUp, ThumbsDown, HelpCircle, ArrowRight, RefreshCw, Brain, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import { mockMovies } from '@/services/mockData';

// Types for the game
interface Clue {
  id: number;
  text: string;
  type: 'plot' | 'character' | 'quote' | 'visual' | 'trivia';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameState {
  currentMovieIndex: number;
  revealedClues: number[];
  guessedCorrectly: boolean;
  attempts: number;
  score: number;
  totalRounds: number;
  completedRounds: number;
  currentGuess: string;
  gameOver: boolean;
}

// Mock clues for movies (in a real app, these would be AI-generated)
const generateCluesForMovie = (movie: any): Clue[] => {
  const { title, overview, year, genres } = movie;
  
  // Extract key words from the title
  const titleWords = title.split(' ').filter((word: string) => 
    word.length > 3 && !['The', 'And', 'From', 'With'].includes(word)
  );
  
  // Create anagram from title
  const createAnagram = (text: string) => {
    return text.split('')
      .sort(() => Math.random() - 0.5)
      .join('')
      .toLowerCase();
  };
  
  // Generate year-based clue
  const yearClue = `This film was released in ${year}.`;
  
  // Generate genre-based clue
  const genreClue = `This movie belongs to the ${genres.join(' and ')} genre${genres.length > 1 ? 's' : ''}.`;
  
  // Generate plot-based clue (simplified version of overview)
  const plotClue = overview.split('.')[0] + '.';
  
  // Generate character or quote clue based on movie type
  const characterOrQuoteClue = genres.includes('Action') 
    ? "A character in this film says: 'Sometimes the only way to win is to fight.'"
    : genres.includes('Drama')
    ? "This film explores themes of redemption and personal growth."
    : genres.includes('Comedy')
    ? "This movie will make you laugh with its witty dialogue and comedic situations."
    : "This film has become a cultural touchstone since its release.";
  
  // Generate visual clue
  const visualClue = "The movie poster features prominent use of the color " + 
    ['blue', 'red', 'black', 'gold', 'green'][Math.floor(Math.random() * 5)] + ".";
  
  // Generate anagram clue
  const anagramClue = `Anagram of the title: ${createAnagram(title.replace(/[^a-zA-Z]/g, ''))}`;
  
  return [
    { id: 1, text: yearClue, type: 'trivia', difficulty: 'easy' },
    { id: 2, text: genreClue, type: 'trivia', difficulty: 'easy' },
    { id: 3, text: plotClue, type: 'plot', difficulty: 'medium' },
    { id: 4, text: characterOrQuoteClue, type: 'quote', difficulty: 'medium' },
    { id: 5, text: visualClue, type: 'visual', difficulty: 'hard' },
    { id: 6, text: anagramClue, type: 'trivia', difficulty: 'hard' },
  ];
};

interface GuessTheMovieProps {
  onComplete?: (score: number, total: number) => void;
  className?: string;
}

const GuessTheMovie = ({ onComplete, className }: GuessTheMovieProps) => {
  // Use state for game movies instead of recreating on every render
  const [gameMovies, setGameMovies] = useState<any[]>([]);
  
  const [clues, setClues] = useState<Clue[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentMovieIndex: 0,
    revealedClues: [1], // Start with one clue revealed
    guessedCorrectly: false,
    attempts: 0,
    score: 0,
    totalRounds: 10, // Default value, will be updated
    completedRounds: 0,
    currentGuess: '',
    gameOver: false
  });
  
  // Initialize game movies only once when component mounts
  useEffect(() => {
    const selectedMovies = [...mockMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setGameMovies(selectedMovies);
    
    // Update total rounds
    setGameState(prev => ({
      ...prev,
      totalRounds: selectedMovies.length
    }));
  }, []);
  
  // Initialize clues for the current movie
  useEffect(() => {
    if (gameMovies.length > 0 && gameState.currentMovieIndex < gameMovies.length) {
      const currentMovie = gameMovies[gameState.currentMovieIndex];
      setClues(generateCluesForMovie(currentMovie));
    }
  }, [gameState.currentMovieIndex, gameMovies]);
  
  // Handle user guess
  const handleGuess = () => {
    if (!gameMovies.length || gameState.currentMovieIndex >= gameMovies.length) {
      return; // Guard against empty gameMovies
    }
    
    const currentMovie = gameMovies[gameState.currentMovieIndex];
    const correctTitle = currentMovie.title.toLowerCase();
    const userGuess = gameState.currentGuess.toLowerCase();
    
    // Check if the guess is correct (allowing for some flexibility)
    const isCorrect = 
      correctTitle === userGuess || 
      correctTitle.includes(userGuess) || 
      userGuess.includes(correctTitle);
    
    if (isCorrect) {
      // Calculate score based on number of clues revealed (fewer clues = higher score)
      const clueScore = 7 - gameState.revealedClues.length; // Max 6 points if guessed with 1 clue
      const attemptScore = Math.max(0, 3 - gameState.attempts); // Max 3 points if guessed on first try
      const roundScore = Math.max(1, clueScore + attemptScore); // Minimum 1 point for correct guess
      
      setGameState(prev => ({
        ...prev,
        guessedCorrectly: true,
        score: prev.score + roundScore
      }));
    } else {
      // Reveal another clue if available
      const nextClueId = gameState.revealedClues.length < clues.length 
        ? gameState.revealedClues.length + 1 
        : gameState.revealedClues.length;
      
      setGameState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        revealedClues: [...new Set([...prev.revealedClues, nextClueId])],
        currentGuess: '' // Clear the input for next guess
      }));
    }
  };
  
  // Move to next movie
  const handleNextMovie = () => {
    if (!gameMovies.length) {
      return; // Guard against empty gameMovies
    }
    
    const isLastMovie = gameState.currentMovieIndex === gameMovies.length - 1;
    
    if (isLastMovie) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        completedRounds: prev.completedRounds + 1
      }));
      
      if (onComplete) {
        onComplete(gameState.score, gameState.totalRounds * 9); // Max possible score: 9 points per round
      }
    } else {
      setGameState(prev => ({
        ...prev,
        currentMovieIndex: prev.currentMovieIndex + 1,
        revealedClues: [1], // Reset to first clue
        guessedCorrectly: false,
        attempts: 0,
        completedRounds: prev.completedRounds + 1,
        currentGuess: ''
      }));
    }
  };
  
  // Reveal next clue
  const revealNextClue = () => {
    if (gameState.revealedClues.length < clues.length) {
      setGameState(prev => ({
        ...prev,
        revealedClues: [...prev.revealedClues, prev.revealedClues.length + 1]
      }));
    }
  };
  
  // Reset the game
  const resetGame = () => {
    // Select new random movies
    const selectedMovies = [...mockMovies]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    setGameMovies(selectedMovies);
    
    // Reset game state
    setGameState({
      currentMovieIndex: 0,
      revealedClues: [1],
      guessedCorrectly: false,
      attempts: 0,
      score: 0,
      totalRounds: selectedMovies.length,
      completedRounds: 0,
      currentGuess: '',
      gameOver: false
    });
  };
  
  // Get current movie
  const currentMovie = gameMovies.length > 0 && gameState.currentMovieIndex < gameMovies.length 
    ? gameMovies[gameState.currentMovieIndex] 
    : null;
  
  // Get visible clues
  const visibleClues = clues.filter(clue => 
    gameState.revealedClues.includes(clue.id)
  );
  
  return (
    <Card className={cn("w-full max-w-3xl mx-auto overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            <CardTitle>Guess The Movie</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/10 text-white">
              Round {gameState.completedRounds + 1}/{gameState.totalRounds}
            </Badge>
            <Badge variant="outline" className="bg-white/10 text-white">
              Score: {gameState.score}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {gameState.gameOver ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-6">
              Your final score: {gameState.score} / {gameState.totalRounds * 9}
            </p>
            <div className="flex justify-center">
              <Button onClick={resetGame} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Play Again
              </Button>
            </div>
          </div>
        ) : !currentMovie ? (
          <div className="text-center py-8">
            <p className="text-xl mb-6">Loading game...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Movie Clues:
              </h3>
              <div className="space-y-3">
                {visibleClues.map((clue) => (
                  <motion.div
                    key={clue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                  >
                    <div className="flex items-start gap-2">
                      <Badge className={cn(
                        "mt-0.5",
                        clue.difficulty === 'easy' ? "bg-green-500" :
                        clue.difficulty === 'medium' ? "bg-yellow-500" : "bg-red-500"
                      )}>
                        {clue.type}
                      </Badge>
                      <p>{clue.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {gameState.guessedCorrectly ? (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-4"
                >
                  <div className="text-green-500 font-bold text-xl mb-2">Correct!</div>
                  <div className="relative w-48 h-72 mx-auto mb-4">
                    <Image
                      src={currentMovie.posterPath}
                      alt={currentMovie.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{currentMovie.title}</h3>
                  <p className="text-gray-500">{currentMovie.year} • {currentMovie.genres.join(', ')}</p>
                </motion.div>
                
                <Button 
                  onClick={handleNextMovie}
                  className="flex items-center gap-2"
                >
                  {gameState.currentMovieIndex === gameMovies.length - 1 ? (
                    <>Finish Game</>
                  ) : (
                    <>Next Movie <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter movie title..."
                    value={gameState.currentGuess}
                    onChange={(e) => setGameState(prev => ({ ...prev, currentGuess: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && gameState.currentGuess.trim() && handleGuess()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleGuess}
                    disabled={!gameState.currentGuess.trim()}
                  >
                    Guess
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Attempts: {gameState.attempts}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={revealNextClue}
                    disabled={gameState.revealedClues.length >= clues.length}
                    className="flex items-center gap-1"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Reveal Next Clue
                  </Button>
                </div>
                
                <Progress 
                  value={(gameState.revealedClues.length / clues.length) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 text-right">
                  {gameState.revealedClues.length}/{clues.length} clues revealed
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="bg-slate-50 dark:bg-slate-900 px-6 py-4">
        <div className="text-sm text-gray-500 italic w-full text-center">
          <div className="flex items-center justify-center gap-1">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>AI-powered movie guessing game</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GuessTheMovie; 