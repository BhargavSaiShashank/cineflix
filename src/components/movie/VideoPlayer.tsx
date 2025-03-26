"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';
import { VideoResult } from '@/lib/tmdb';

interface VideoPlayerProps {
  video: VideoResult;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, poster }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string>('');

  const getEmbedUrl = (video: VideoResult): string => {
    if (!video?.key) return '';
    
    if (video.site === 'YouTube') {
      return `https://www.youtube.com/embed/${video.key}?autoplay=1&modestbranding=1&rel=0`;
    } else if (video.site === 'Vimeo') {
      return `https://player.vimeo.com/video/${video.key}?autoplay=1`;
    }
    return '';
  };

  useEffect(() => {
    const url = getEmbedUrl(video);
    setEmbedUrl(url);
  }, [video]);

  if (!video?.key || !embedUrl) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="default"
        size="lg"
        className="w-48 bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-pink-500/20 transition-all duration-200"
      >
        <Play className="h-5 w-5 mr-2" />
        Watch Trailer
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0 border-none bg-transparent">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {embedUrl && (
              <iframe
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
            <DialogClose className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer; 