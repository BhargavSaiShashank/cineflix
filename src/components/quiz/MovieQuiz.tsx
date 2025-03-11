"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X, Award, ArrowRight, RefreshCw, Clock, Brain } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which actor played Tony Stark in the Marvel Cinematic Universe?",
    options: [
      "Chris Evans",
      "Robert Downey Jr.",
      "Chris Hemsworth",
      "Mark Ruffalo"
    ],
    correctAnswer: "Robert Downey Jr.",
    difficulty: "easy",
    image: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg"
  },
  {
    id: 2,
    question: "Which Christopher Nolan film features a team entering dreams?",
    options: [
      "Interstellar",
      "The Dark Knight",
      "Inception",
      "Tenet"
    ],
    correctAnswer: "Inception",
    difficulty: "medium",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
  },
  {
    id: 3,
    question: "Who directed the 1994 film 'Pulp Fiction'?",
    options: [
      "Martin Scorsese",
      "Steven Spielberg",
      "Quentin Tarantino",
      "Francis Ford Coppola"
    ],
    correctAnswer: "Quentin Tarantino",
    difficulty: "easy",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
  },
  {
    id: 4,
    question: "Which film won the Academy Award for Best Picture in 2020?",
    options: [
      "1917",
      "Joker",
      "Parasite",
      "Once Upon a Time in Hollywood"
    ],
    correctAnswer: "Parasite",
    difficulty: "hard",
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    id: 5,
    question: "Which actress plays Katniss Everdeen in 'The Hunger Games'?",
    options: [
      "Emma Watson",
      "Jennifer Lawrence",
      "Shailene Woodley",
      "Emma Stone"
    ],
    correctAnswer: "Jennifer Lawrence",
    difficulty: "easy",
    image: "https://image.tmdb.org/t/p/w500/5KSYYzSKFWfFMbJ3VwgL7nIPYsY.jpg"
  }
];

// Quiz difficulty colors and indicators
const difficultyConfig = {
  easy: {
    color: "bg-green-500",
    indicatorColor: "success",
    label: "Easy"
  },
  medium: {
    color: "bg-yellow-500",
    indicatorColor: "warning",
    label: "Medium"
  },
  hard: {
    color: "bg-red-500",
    indicatorColor: "error",
    label: "Hard"
  }
};

interface MovieQuizProps {
  onComplete?: (score: number, total: number) => void;
  className?: string;
}

const MovieQuiz = ({ onComplete, className }: MovieQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [timerActive, setTimerActive] = useState(true);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const difficulty = currentQuestion.difficulty as keyof typeof difficultyConfig;
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0 && !isAnswerSubmitted) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswerSubmitted) {
      handleSubmitAnswer();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, timerActive, isAnswerSubmitted]);
  
  const handleSelectAnswer = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };
  
  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
    setTimerActive(false);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setTimeLeft(15);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), quizQuestions.length);
      }
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(15);
    setTimerActive(true);
  };
  
  const getScoreMessage = () => {
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer && !quizCompleted ? 1 : 0);
    const percentage = (finalScore / quizQuestions.length) * 100;
    
    if (percentage >= 80) return "Amazing! You're a true film buff!";
    if (percentage >= 60) return "Great job! You know your movies!";
    if (percentage >= 40) return "Not bad! Keep watching more films!";
    return "Keep practicing! There's a whole world of cinema to explore!";
  };
  
  // Get timer indicator color based on time left
  const getTimerIndicator = () => {
    if (timeLeft < 5) return "error";
    if (timeLeft < 10) return "warning";
    return "success";
  };
  
  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {currentQuestion.image && (
                  <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${currentQuestion.image})`,
                      filter: 'blur(2px)'
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Badge 
                      variant="outline" 
                      className={`${difficultyConfig[difficulty].color} text-white border-0 shadow-lg`}
                    >
                      {difficultyConfig[difficulty].label}
                    </Badge>
                    <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-white/10">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </Badge>
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-xl font-semibold"
                  >
                    {currentQuestion.question}
                  </motion.h3>
                </div>
              </div>
              
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>Time Remaining</span>
                    </div>
                    <motion.span
                      key={timeLeft}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        "font-medium",
                        timeLeft < 5 ? "text-red-500" : timeLeft < 10 ? "text-yellow-500" : "text-green-500"
                      )}
                    >
                      {timeLeft} seconds
                    </motion.span>
                  </div>
                  <Progress 
                    value={(timeLeft / 15) * 100} 
                    indicatorColor={getTimerIndicator()}
                    className="h-2.5"
                  />
                </div>
                
                <div className="space-y-3 mt-6">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: isAnswerSubmitted ? 1 : 1.02, boxShadow: isAnswerSubmitted ? "none" : "0 0 10px rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: isAnswerSubmitted ? 1 : 0.98 }}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        isAnswerSubmitted
                          ? option === currentQuestion.correctAnswer
                            ? 'bg-green-500/20 border border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                            : selectedAnswer === option
                            ? 'bg-red-500/20 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                            : 'bg-gray-800/50 border border-gray-700'
                          : selectedAnswer === option
                          ? 'bg-primary/20 border border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]'
                          : 'bg-gray-800/50 border border-white/5 hover:bg-gray-700/50 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswerSubmitted && (
                          option === currentQuestion.correctAnswer ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 10 }}
                            >
                              <Check className="h-5 w-5 text-green-500" />
                            </motion.div>
                          ) : selectedAnswer === option ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 10 }}
                            >
                              <X className="h-5 w-5 text-red-500" />
                            </motion.div>
                          ) : null
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t border-white/5 pt-4">
                <div className="flex items-center text-sm">
                  <Brain className="h-4 w-4 mr-1 text-primary" />
                  <span>Score: </span>
                  <motion.span 
                    key={score}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="font-bold ml-1"
                  >
                    {score}/{currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
                  </motion.span>
                </div>
                
                {!isAnswerSubmitted ? (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={!selectedAnswer}
                    className={cn(
                      "transition-all duration-300",
                      selectedAnswer 
                        ? "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90" 
                        : "bg-gray-700/50"
                    )}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                  >
                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                      <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Finish Quiz <Check className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/20 backdrop-blur-sm border border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Award className="h-6 w-6 mr-2 text-yellow-500" />
                  Quiz Results
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="text-5xl font-bold mb-3"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
                  >
                    {score}/{quizQuestions.length}
                  </motion.div>
                  <p className="text-gray-400 text-lg">{getScoreMessage()}</p>
                </motion.div>
                
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score</span>
                    <span>{Math.round((score / quizQuestions.length) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(score / quizQuestions.length) * 100} 
                    indicatorColor={score === quizQuestions.length ? "gradient" : 
                                   (score / quizQuestions.length) >= 0.7 ? "success" : 
                                   (score / quizQuestions.length) >= 0.4 ? "warning" : "error"}
                    className="h-3"
                  />
                </div>
                
                {score === quizQuestions.length && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/50 rounded-lg mb-6 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                  >
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-medium">Perfect Score! You're a movie master!</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieQuiz; 