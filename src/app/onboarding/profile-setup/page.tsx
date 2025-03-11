"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, ChevronRight, ChevronLeft, Check, X } from 'lucide-react';

// Popular movie genres
const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
  "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", 
  "Thriller", "Western", "Biography", "Family", "Musical", "War"
];

export default function ProfileSetupPage() {
  const { user, updateProfile } = useAuth();
  
  // Form state
  const [userName, setUserName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(user?.favoriteGenres || []);
  const [isLoading, setIsLoading] = useState(false);
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Load user data if available
  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setBio(user.bio || '');
      setAvatarUrl(user.avatarUrl || '');
      setSelectedGenres(user.favoriteGenres || []);
    }
  }, [user]);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      if (selectedGenres.length < 5) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        name: userName,
        bio,
        avatarUrl,
        favoriteGenres: selectedGenres,
        profileCompleted: true
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900/60 rounded-xl border border-gray-800 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Set Up Your Profile</h1>
          <p className="text-gray-400">Tell us a bit about yourself and your movie preferences</p>
          
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-400 mt-2">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} alt={userName} />
                  <AvatarFallback className="text-lg bg-primary/20 text-primary">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://example.com/your-image.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
                <p className="text-xs text-gray-500">Enter a URL for your profile picture</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userName">Display Name</Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="How you want to be known"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself and your movie tastes..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  variant="gradient"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Movie Preferences */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Favorite Movie Genres (Select up to 5)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {GENRES.map(genre => (
                    <Badge
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedGenres.includes(genre) 
                          ? "bg-primary hover:bg-primary/90" 
                          : "hover:bg-gray-800"
                      }`}
                      onClick={() => handleGenreToggle(genre)}
                    >
                      {genre}
                      {selectedGenres.includes(genre) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {selectedGenres.length}/5
                </p>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  onClick={handlePreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  variant="gradient"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Finish */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl} alt={userName} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium text-white">{userName}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{bio || "No bio provided"}</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Favorite Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGenres.length > 0 ? (
                    selectedGenres.map(genre => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No genres selected</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  onClick={handlePreviousStep}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  variant="gradient"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 