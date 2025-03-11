import { mockTrendingMovies, mockTopRatedMovies, mockRecommendedMovies } from './mockData';

// Map emotions to genres or movie types
const emotionToGenreMap: Record<string, string[]> = {
  "Happy": ["comedy", "animation", "family"],
  "Sad": ["drama", "romance"],
  "Excited": ["action", "adventure", "sci-fi"],
  "Relaxed": ["documentary", "nature", "comedy"],
  "Anxious": ["thriller", "mystery"],
  "Romantic": ["romance", "drama"],
  "Nostalgic": ["classic", "history", "period-drama"],
  "Inspired": ["biography", "sports", "documentary"],
  "Curious": ["mystery", "sci-fi", "documentary"],
  "Bored": ["action", "comedy", "adventure"],
  "Adventurous": ["adventure", "action", "fantasy"],
  "Thoughtful": ["drama", "mystery", "sci-fi"],
  "Hopeful": ["drama", "family", "fantasy"],
  "Melancholic": ["drama", "indie", "romance"],
  "Energetic": ["action", "sports", "music"]
};

// Combine all mock movies for the recommendation pool
const allMovies = [...mockTrendingMovies, ...mockTopRatedMovies, ...mockRecommendedMovies];

// Function to get unique movies (no duplicates by ID)
const getUniqueMovies = (movies: any[]) => {
  const uniqueMovies = movies.filter((movie, index, self) => 
    index === self.findIndex((m) => m.id === movie.id)
  );
  return uniqueMovies;
};

// Get recommendations based on emotion
export const getEmotionBasedRecommendations = (emotion: string, limit: number = 10) => {
  // Normalize emotion to lowercase for case-insensitive matching
  const normalizedEmotion = emotion.toLowerCase();
  
  // Check if we have a direct mapping for this emotion
  const matchedEmotion = Object.keys(emotionToGenreMap).find(
    key => key.toLowerCase() === normalizedEmotion
  );
  
  let recommendedGenres: string[] = [];
  
  if (matchedEmotion) {
    // Use the predefined genres for this emotion
    recommendedGenres = emotionToGenreMap[matchedEmotion];
  } else {
    // For custom emotions, try to find similar emotions or use a default set
    // This is a simple implementation - in a real app, you might use NLP or AI
    const allEmotions = Object.keys(emotionToGenreMap);
    const similarEmotion = allEmotions.find(e => 
      normalizedEmotion.includes(e.toLowerCase()) || e.toLowerCase().includes(normalizedEmotion)
    );
    
    recommendedGenres = similarEmotion 
      ? emotionToGenreMap[similarEmotion]
      : ["drama", "comedy", "action"]; // Default genres if no match
  }
  
  // In a real app, you would filter movies by genre
  // For this mock, we'll just shuffle and return a subset
  const shuffled = [...allMovies].sort(() => 0.5 - Math.random());
  
  // Return unique movies up to the limit
  return getUniqueMovies(shuffled).slice(0, limit);
}; 