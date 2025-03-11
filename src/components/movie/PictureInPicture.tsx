"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize, Maximize, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PictureInPictureProps {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
  videoSrc: string;
  onClose: () => void;
}

export default function PictureInPicture({ movie, videoSrc, onClose }: PictureInPictureProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle video playback
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle video muting
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current && e.target === containerRef.current.querySelector('.drag-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const maxX = window.innerWidth - containerRef.current.offsetWidth;
      const maxY = window.innerHeight - containerRef.current.offsetHeight;
      
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, maxX));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, maxY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle minimize/maximize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed z-50 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-64' : 'w-80 sm:w-96'
      }`}
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header/Drag Handle */}
      <div 
        className="bg-black/90 p-2 flex items-center justify-between drag-handle"
        style={{ cursor: 'grab' }}
      >
        <div className="flex items-center">
          <Image 
            src={movie.posterPath} 
            alt={movie.title}
            width={24}
            height={36}
            className="h-6 w-4 object-cover rounded mr-2"
          />
          <span className="text-white text-sm font-medium truncate">{movie.title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize className="h-3 w-3" /> : <Minimize className="h-3 w-3" />}
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Video Player */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-auto"
          autoPlay
          playsInline
        />
        
        {/* Controls Overlay */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress Bar */}
          <div className="px-3 pb-1">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="px-3 pb-3 flex items-center justify-between">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 