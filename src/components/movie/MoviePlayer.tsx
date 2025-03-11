"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, Settings, X, PictureInPicture } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useWatchProgress } from '@/contexts/WatchProgressContext';
import PictureInPictureComponent from './PictureInPicture';

interface MoviePlayerProps {
  movieId: number;
  title: string;
  videoSrc: string;
  posterSrc: string;
  onClose?: () => void;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({
  movieId,
  title,
  videoSrc,
  posterSrc,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [savedProgress, setSavedProgress] = useState(0);
  const [isPipActive, setIsPipActive] = useState(false);
  
  const { updateProgress, getProgress } = useWatchProgress();
  
  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      playerElement.addEventListener('click', handleMouseMove);
    }
    
    return () => {
      clearTimeout(timeout);
      if (playerElement) {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        playerElement.removeEventListener('click', handleMouseMove);
      }
    };
  }, [isPlaying]);
  
  // Check for saved progress on load
  useEffect(() => {
    const progress = getProgress(movieId);
    if (progress && progress.progress > 0 && progress.progress < 95) {
      const timeToResume = (progress.progress / 100) * progress.duration;
      setSavedProgress(timeToResume);
      setShowResumePrompt(true);
    }
  }, [movieId, getProgress]);
  
  // Update progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && duration > 0 && isPlaying) {
        const currentProgress = (videoRef.current.currentTime / duration) * 100;
        updateProgress(movieId, currentProgress, duration);
      }
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [movieId, duration, isPlaying, updateProgress]);
  
  // Handle video events
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    updateProgress(movieId, 100, duration); // Mark as completed
  };
  
  // Player controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };
  
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const resumeFromSavedProgress = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = savedProgress;
      videoRef.current.play();
      setIsPlaying(true);
      setShowResumePrompt(false);
    }
  };
  
  const startFromBeginning = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setShowResumePrompt(false);
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Toggle Picture-in-Picture mode
  const togglePictureInPicture = () => {
    setIsPipActive(!isPipActive);
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  // Close PiP mode
  const closePictureInPicture = () => {
    setIsPipActive(false);
  };
  
  return (
    <>
      <div 
        ref={playerRef}
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      >
        {!isPipActive && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            className="w-full h-full object-contain"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
        
        {/* Resume prompt */}
        {showResumePrompt && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
            <div className="bg-[#1e293b] p-6 rounded-lg max-w-md text-center">
              <h3 className="text-xl font-bold text-white mb-4">Resume Watching</h3>
              <p className="text-gray-300 mb-6">
                Would you like to continue watching from where you left off?
                <br />
                <span className="text-gray-400 text-sm">
                  {formatTime(savedProgress)} / {formatTime(duration)}
                </span>
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-white/10"
                  onClick={startFromBeginning}
                >
                  Start from Beginning
                </Button>
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={resumeFromSavedProgress}
                >
                  Resume
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Close button */}
        {onClose && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        
        {/* Video controls */}
        {!isPipActive && (
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress bar */}
            <div className="mb-2">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
                className="h-1"
              />
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <div className="flex items-center space-x-2 ml-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  
                  <div className="w-24 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="h-1"
                    />
                  </div>
                </div>
                
                <div className="text-white text-sm ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={togglePictureInPicture}
                >
                  <PictureInPicture className="h-5 w-5" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Picture-in-Picture mode */}
      {isPipActive && (
        <PictureInPictureComponent
          movie={{
            id: movieId,
            title: title,
            posterPath: posterSrc
          }}
          videoSrc={videoSrc}
          onClose={closePictureInPicture}
        />
      )}
    </>
  );
};

export default MoviePlayer; 