"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, MessageSquare, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Image from 'next/image';
import { mockMovies } from '@/services/mockData';

// Review styles
const REVIEW_STYLES = [
  { id: 'casual', name: 'Casual Viewer', description: 'Everyday language for the average moviegoer' },
  { id: 'academic', name: 'Academic', description: 'Scholarly analysis with film theory references' },
  { id: 'humorous', name: 'Humorous', description: 'Light-hearted and witty commentary' },
  { id: 'critical', name: 'Critical', description: 'In-depth analysis focusing on strengths and weaknesses' },
  { id: 'nostalgic', name: 'Nostalgic', description: 'Focuses on the film\'s place in cinema history' }
];

// Sample review templates (in a real app, these would be generated by AI)
const REVIEW_TEMPLATES: Record<string, Record<string, string>> = {
  'casual': {
    'Inception': "This movie blew my mind! The way the dreams work inside other dreams is super cool, and the special effects are amazing. Leonardo DiCaprio does a great job making you care about his character's journey home. The ending will definitely leave you talking with friends about what you think really happened. If you like movies that make you think, this is definitely one to watch!",
    'The Shawshank Redemption': "Wow, what a powerful movie! The friendship between Andy and Red is so genuine and heartwarming. The story of hope and perseverance really hits you in the feels. The prison scenes feel so real, and the ending is absolutely perfect. This is definitely one of those movies that stays with you long after watching it. Totally worth your time!",
    'default': "This film offers an entertaining experience with solid performances and an engaging storyline. The pacing keeps viewers interested throughout, and there are several memorable scenes that stand out. While not perfect, it delivers what fans of the genre would expect and makes for an enjoyable watch for a casual movie night."
  },
  'academic': {
    'Inception': "Nolan's tour de force represents a paradigm shift in contemporary cinema's approach to the subconscious. The film's nested dream architecture serves as both narrative device and metaphorical framework, inviting discourse on the nature of reality and memory. DiCaprio's Cobb embodies the postmodern protagonist—fractured, unreliable, yet compelling. The visual grammar employed creates a semiotic language that transcends conventional storytelling, positioning the work as a significant text in 21st century filmmaking.",
    'The Shawshank Redemption': "Darabont's adaptation of King's novella functions as a profound examination of institutional power structures and the human capacity for resilience. The film employs classical narrative techniques while subverting prison film tropes to create a text rich in sociopolitical commentary. The cinematography, particularly the deployment of light motifs, reinforces the thematic exploration of hope amid systemic oppression. Freeman and Robbins deliver performances of remarkable nuance, embodying the dialectic between acceptance and resistance.",
    'default': "This cinematic text presents a notable contribution to its genre, employing established conventions while occasionally subverting audience expectations. The director's visual language demonstrates clear influences from both classical and contemporary filmmaking traditions. The narrative structure reveals layers of meaning upon critical analysis, particularly in its treatment of societal themes. The performances merit scholarly attention for their embodiment of complex character dynamics within the established theoretical framework."
  },
  'humorous': {
    'Inception': "Ever had that dream where you're falling and then you wake up? Well, this movie is like that, except you fall into another dream, then another, then another... It's like dream Inception! Wait, that's literally the title. DiCaprio spends the whole movie trying to get home, making this the most complicated travel movie since Planes, Trains and Automobiles. The special effects department clearly had a blast folding Paris like origami—probably the most fun anyone's had with Paris since the invention of the croissant.",
    'The Shawshank Redemption': "A heartwarming tale about a man who digs a tunnel with a tiny rock hammer, proving that persistence pays off (estimated completion time: only 19 years!). Features the world's longest prison escape and the most satisfying rain scene since singing in it became popular. Morgan Freeman narrates this movie so beautifully that I now want him to narrate my life, especially my attempts at parallel parking. The warden could have benefited from a course in 'How Not to Be a Terrible Human Being 101.'",
    'default': "This movie boldly asks the question: 'What if we took all these actors, put them in these situations, and filmed it?' And boy, did they film it! The director clearly attended the 'Dramatic Music Makes Everything Better' school of filmmaking. The main character faces challenges that could easily be resolved with a simple conversation, but where's the fun in that? Watch for the scene where someone stares meaningfully into the distance—it happens at least seven times. Perfect for viewing when you want to be entertained but not enough to actually pay attention!"
  },
  'default': {
    'default': "This film presents an interesting take on its subject matter, with performances that range from compelling to adequate. The direction shows moments of inspiration, particularly in key scenes that advance the narrative. While not without flaws, the overall execution delivers on the premise and should satisfy viewers interested in this type of storytelling. The technical aspects complement the narrative intentions, creating a cohesive viewing experience."
  }
};

export default function FilmCritic() {
  const [selectedMovie, setSelectedMovie] = useState(mockMovies[0]);
  const [selectedStyle, setSelectedStyle] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReview, setGeneratedReview] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState<'positive' | 'negative' | null>(null);

  // Generate AI review
  const generateReview = () => {
    if (!selectedMovie || !selectedStyle) return;
    
    setIsGenerating(true);
    setReviewFeedback(null);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an AI service
      // For now, we'll use templates
      const movieReviews = REVIEW_TEMPLATES[selectedStyle] || REVIEW_TEMPLATES['default'];
      const review = movieReviews[selectedMovie.title] || movieReviews['default'];
      
      setGeneratedReview(review);
      setIsGenerating(false);
    }, 2000);
  };

  // Copy review to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReview);
    // You could add a toast notification here
  };

  // Handle review feedback
  const handleReviewFeedback = (isPositive: boolean) => {
    setReviewFeedback(isPositive ? 'positive' : 'negative');
    // In a real app, this would send feedback to improve the AI model
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          AI Film Critic
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get personalized movie reviews in different styles, from casual to academic.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie selection and review options */}
        <div className="lg:col-span-1">
          <Card className="bg-[#1e293b] border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-white">Select a Movie</CardTitle>
              <CardDescription className="text-gray-400">
                Choose a film and review style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Movie selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {mockMovies.slice(0, 6).map(movie => (
                    <div 
                      key={movie.id}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedMovie?.id === movie.id 
                          ? 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedMovie(movie)}
                    >
                      <div className="relative aspect-[2/3]">
                        <Image
                          src={movie.posterPath}
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedMovie && (
                  <div className="mt-4">
                    <h3 className="text-white font-bold">{selectedMovie.title}</h3>
                    <p className="text-gray-400 text-sm">{selectedMovie.year}</p>
                  </div>
                )}
              </div>
              
              {/* Review style selection */}
              <div>
                <label className="text-white text-sm mb-2 block">Review Style</label>
                <Select 
                  value={selectedStyle} 
                  onValueChange={setSelectedStyle}
                >
                  <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                    {REVIEW_STYLES.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        <div>
                          <div className="font-medium">{style.name}</div>
                          <div className="text-xs text-gray-400">{style.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={generateReview}
                disabled={!selectedMovie || !selectedStyle || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Generating review...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Review
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Generated review display */}
        <div className="lg:col-span-2">
          <Card className="bg-[#1e293b] border-gray-700 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">AI-Generated Review</CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedStyle && REVIEW_STYLES.find(style => style.id === selectedStyle)?.name} perspective
                </CardDescription>
              </div>
              {generatedReview && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-white"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="min-h-[300px]">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Sparkles className="h-10 w-10 text-pink-500 animate-pulse mx-auto mb-4" />
                    <p className="text-gray-400">Our AI critic is analyzing the film...</p>
                  </div>
                </div>
              ) : generatedReview ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 text-pink-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white leading-relaxed">{generatedReview}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 italic">Select a movie and style, then generate a review</p>
                </div>
              )}
            </CardContent>
            {generatedReview && (
              <CardFooter className="border-t border-gray-700 flex justify-between">
                <div className="text-sm text-gray-400">
                  Was this review helpful?
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${reviewFeedback === 'positive' ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
                    onClick={() => handleReviewFeedback(true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Yes
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`${reviewFeedback === 'negative' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    onClick={() => handleReviewFeedback(false)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    No
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 