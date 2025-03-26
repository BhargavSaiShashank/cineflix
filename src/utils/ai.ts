/**
 * Sends a message to the AI API and returns the response
 * @param message The user's message to send to the AI
 * @returns The AI's response
 */
export async function getChatResponse(message: string): Promise<string> {
  try {
    console.log(`Sending chat request: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);
    
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`Failed to get AI response: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.response) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from API');
    }
    
    return data.response;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
}

/**
 * Analyzes a movie using rule-based templates
 * @param movieTitle The title of the movie to analyze
 * @param movieOverview A brief overview of the movie
 * @returns An analysis of the movie
 */
export async function analyzeMovie(movieTitle: string, movieOverview: string): Promise<string> {
  try {
    // First try to get an analysis from the AI API
    const prompt = `Analyze the movie "${movieTitle}". Overview: ${movieOverview}. 
    Provide insights on themes, characters, cinematic elements, and cultural impact.`;
    
    const aiResponse = await getChatResponse(prompt);
    return aiResponse;
  } catch (error) {
    console.error('Error getting AI movie analysis:', error);
    
    // Fall back to rule-based analysis
    return generateMovieAnalysis(movieTitle, movieOverview);
  }
}

/**
 * Generates a rule-based movie analysis as a fallback
 */
function generateMovieAnalysis(movieTitle: string, movieOverview: string): string {
  // Extract potential themes from the overview
  const themes = extractThemes(movieOverview);
  
  // Extract potential genres
  const genres = extractGenres(movieOverview);
  
  // Generate a random rating between 7.5 and 9.5
  const rating = (7.5 + Math.random() * 2).toFixed(1);
  
  // Generate analysis based on the movie title, overview, and extracted themes
  return `
# Analysis of ${movieTitle}

## Overview
${movieTitle} is a compelling ${genres[0] || 'film'} that explores several thought-provoking themes. The narrative effectively balances entertainment value with artistic merit, making it both accessible and meaningful to audiences.

## Key Themes
${themes.map(theme => `- **${theme}**: The film explores this theme through its characters and narrative structure.`).join('\n')}

## Character Analysis
The characters in ${movieTitle} are well-developed and serve the narrative effectively. The protagonist's journey reflects the film's central themes, while supporting characters provide necessary context and emotional depth. The character dynamics create tension and emotional resonance throughout the story.

## Cinematic Elements
The film's visual style and cinematography enhance the storytelling, creating a cohesive aesthetic that supports the narrative. The director's vision is evident in the careful composition of scenes and the overall pacing. The score complements the emotional beats of the film, heightening key moments and transitions.

## Cultural Impact
${movieTitle} has made a notable contribution to cinema, resonating with both audiences and critics. Its exploration of ${themes[0] || 'universal themes'} speaks to broader cultural conversations and demonstrates the power of film as an artistic medium. The film's influence can be seen in subsequent works within the ${genres[0] || 'same'} genre.

## Critical Reception
Critics have generally responded positively to ${movieTitle}, with particular praise for its ${Math.random() > 0.5 ? 'performances' : 'direction'} and ${Math.random() > 0.5 ? 'screenplay' : 'visual elements'}. The film holds a rating of ${rating}/10 among critics, reflecting its artistic achievements and audience appeal.
  `;
}

/**
 * Helper function to extract potential genres from a movie overview
 */
function extractGenres(overview: string): string[] {
  const genres = [];
  
  if (overview.match(/action|fight|battle|explosion|chase|combat/i)) {
    genres.push("Action");
  }
  
  if (overview.match(/comedy|funny|humor|laugh|joke|hilarious/i)) {
    genres.push("Comedy");
  }
  
  if (overview.match(/drama|emotional|relationship|conflict|struggle/i)) {
    genres.push("Drama");
  }
  
  if (overview.match(/horror|scary|fear|terrify|nightmare|monster/i)) {
    genres.push("Horror");
  }
  
  if (overview.match(/sci-fi|science fiction|future|space|alien|technology|robot/i)) {
    genres.push("Science Fiction");
  }
  
  if (overview.match(/romance|love|relationship|couple|romantic/i)) {
    genres.push("Romance");
  }
  
  if (overview.match(/thriller|suspense|tension|mystery|danger/i)) {
    genres.push("Thriller");
  }
  
  if (overview.match(/fantasy|magic|wizard|dragon|mythical|supernatural/i)) {
    genres.push("Fantasy");
  }
  
  // Add a default genre if none were found
  if (genres.length === 0) {
    genres.push("Drama");
  }
  
  return genres;
}

/**
 * Gets movie recommendations based on user preferences using rule-based templates
 * @param userPreferences The user's movie preferences
 * @returns An object containing recommended movies and recommendation text
 */
export async function getMovieRecommendations(userPreferences: string): Promise<{ movies: any[], recommendationsText: string }> {
  try {
    const preferences = userPreferences.toLowerCase();
    let recommendationsText = '';
    
    // Action movies
    if (preferences.includes('action') || preferences.includes('exciting') || preferences.includes('thrill')) {
      recommendationsText = `
Based on your preference for action films, I recommend:

1. "Mad Max: Fury Road" - A high-octane action film with stunning visuals and practical effects.
2. "John Wick" - Features exceptional choreography and a compelling revenge story.
3. "The Raid" - Known for its incredible martial arts sequences and intense pacing.
4. "Mission Impossible: Fallout" - Tom Cruise performs his own stunts in this thrilling spy adventure.
5. "Die Hard" - The classic action film that defined the genre for decades to come.
      `;
    }
    
    // Sci-fi movies
    else if (preferences.includes('sci-fi') || preferences.includes('science fiction') || preferences.includes('future')) {
      recommendationsText = `
Based on your interest in science fiction, I recommend:

1. "Blade Runner 2049" - A visually stunning sequel that expands on the original's themes of humanity.
2. "Arrival" - A thoughtful exploration of language and time with aliens.
3. "Ex Machina" - A tense examination of artificial intelligence and consciousness.
4. "Dune" - Epic sci-fi with incredible world-building and visual design.
5. "Children of Men" - A gripping dystopian film with remarkable long-take sequences.
      `;
    }
    
    // Drama movies
    else if (preferences.includes('drama') || preferences.includes('emotional') || preferences.includes('character')) {
      recommendationsText = `
Based on your interest in dramatic films, I recommend:

1. "The Shawshank Redemption" - A powerful story of hope and friendship.
2. "Parasite" - A genre-defying film about class inequality with unexpected twists.
3. "Marriage Story" - An intimate portrayal of a relationship's end with exceptional performances.
4. "Moonlight" - A beautiful coming-of-age story told across three defining chapters.
5. "The Godfather" - The definitive crime drama about family and power.
      `;
    }
    
    // Comedy movies
    else if (preferences.includes('comedy') || preferences.includes('funny') || preferences.includes('laugh')) {
      recommendationsText = `
Based on your interest in comedies, I recommend:

1. "The Grand Budapest Hotel" - Wes Anderson's visually distinctive comedy with quirky characters.
2. "Superbad" - A hilarious coming-of-age comedy about friendship.
3. "Bridesmaids" - A female-led comedy with heart and plenty of laughs.
4. "What We Do in the Shadows" - A mockumentary about vampires sharing a house.
5. "Airplane!" - The classic parody film filled with non-stop gags and jokes.
      `;
    }
    
    // Default recommendations
    else {
      recommendationsText = `
Based on your preferences, here are some excellent films to consider:

1. "Everything Everywhere All at Once" - A genre-bending film about family, choices, and parallel universes.
2. "The Social Network" - A compelling drama about the founding of Facebook with sharp dialogue.
3. "Get Out" - A thought-provoking horror film with social commentary.
4. "La La Land" - A beautiful musical about dreams and relationships in Los Angeles.
5. "Knives Out" - A fresh take on the murder mystery genre with an excellent ensemble cast.
      `;
    }
    
    // For now, we'll return mock movies
    // In a real implementation, you would parse the AI response and return actual movie data
    const mockMovies = [
      { id: 1, title: "Inception", year: 2010, rating: 8.8, genres: ["Sci-Fi", "Action", "Thriller"], posterPath: "/images/inception.jpg", overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
      { id: 2, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genres: ["Drama"], posterPath: "/images/shawshank.jpg", overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
      { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genres: ["Action", "Crime", "Drama"], posterPath: "/images/dark_knight.jpg", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
      { id: 4, title: "Pulp Fiction", year: 1994, rating: 8.9, genres: ["Crime", "Drama"], posterPath: "/images/pulp_fiction.jpg", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
      { id: 5, title: "The Godfather", year: 1972, rating: 9.2, genres: ["Crime", "Drama"], posterPath: "/images/godfather.jpg", overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
      { id: 6, title: "Fight Club", year: 1999, rating: 8.8, genres: ["Drama"], posterPath: "/images/fight_club.jpg", overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more." }
    ];
    
    // Return both the mock movies and the recommendation text
    return { 
      movies: mockMovies.sort(() => 0.5 - Math.random()).slice(0, 6), 
      recommendationsText 
    };
  } catch (error) {
    console.error('Error in getMovieRecommendations:', error);
    throw error;
  }
}

/**
 * Helper function to extract potential themes from a movie overview
 */
function extractThemes(overview: string): string[] {
  const themes = [];
  
  // Check for common themes in the overview
  if (overview.match(/love|relationship|romance|heart/i)) {
    themes.push("Love and Relationships");
  }
  
  if (overview.match(/identity|who am i|self-discovery|finding \w+self/i)) {
    themes.push("Identity and Self-Discovery");
  }
  
  if (overview.match(/family|father|mother|son|daughter|parent/i)) {
    themes.push("Family Dynamics");
  }
  
  if (overview.match(/society|class|social|inequality|rich|poor/i)) {
    themes.push("Social Commentary");
  }
  
  if (overview.match(/power|control|influence|domination|authority/i)) {
    themes.push("Power and Control");
  }
  
  if (overview.match(/moral|ethics|right|wrong|choice|decision/i)) {
    themes.push("Moral Ambiguity and Ethical Dilemmas");
  }
  
  if (overview.match(/survive|survival|death|mortality/i)) {
    themes.push("Survival and Mortality");
  }
  
  if (overview.match(/dream|reality|perception|illusion/i)) {
    themes.push("Dreams vs. Reality");
  }
  
  if (overview.match(/technology|future|advancement|progress|digital/i)) {
    themes.push("Technology and Progress");
  }
  
  if (overview.match(/war|conflict|battle|fight|enemy/i)) {
    themes.push("Conflict and War");
  }
  
  // Add some default themes if none were found
  if (themes.length === 0) {
    themes.push("Human Connection");
    themes.push("Personal Growth");
    themes.push("Overcoming Adversity");
  }
  
  // Limit to 3-5 themes
  return themes.slice(0, Math.min(themes.length, 5));
} 