import { NextResponse } from 'next/server';

// List of free Hugging Face models we can try
const MODELS = [
  "facebook/blenderbot-400M-distill",
  "microsoft/DialoGPT-medium",
  "EleutherAI/gpt-neo-125M"
];

export async function POST(request: Request) {
  let userMessage = '';
  
  try {
    const { message } = await request.json();
    userMessage = message || '';

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Add movie context to the message
    const enhancedMessage = `As a movie expert, please answer this question: ${userMessage}`;
    
    // Try each model until one works
    let aiResponse = null;
    let modelError = null;

    // For debugging - log the request
    console.log(`Processing AI request: "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}"`);

    // Skip API calls and use fallback directly for faster development
    // Remove this line in production for actual API calls
    try {
      // Comment out the next line to enable actual API calls to Hugging Face models
      // throw new Error('Skipping API calls for faster development');
      
      // The code below will only run if the above error is caught or removed
      for (const model of MODELS) {
        try {
          console.log(`Trying model: ${model}`);
          
          // Use the free Hugging Face Inference API
          const response = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ inputs: enhancedMessage }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error response from ${model}: ${response.status} - ${errorText}`);
            throw new Error(`Failed to get response from ${model}: ${response.status}`);
          }

          const data = await response.json();
          console.log(`Response from ${model}:`, JSON.stringify(data).substring(0, 100));
          
          // Different models return results in different formats
          if (data.generated_text) {
            aiResponse = data.generated_text;
            break;
          } else if (Array.isArray(data) && data[0]?.generated_text) {
            aiResponse = data[0].generated_text;
            break;
          } else if (data.choices && data.choices[0]?.text) {
            aiResponse = data.choices[0].text;
            break;
          }
          
          console.error(`Unexpected response format from ${model}`);
        } catch (error) {
          console.error(`Error with model ${model}:`, error);
          modelError = error;
          // Continue to the next model
        }
      }
    } catch (skipError) {
      console.error('API error:', skipError);
      // Fall through to the fallback response
    }

    // If we got a response from any model, return it
    if (aiResponse) {
      // Clean up the response to make it more relevant to movies
      aiResponse = cleanResponse(aiResponse);
      console.log(`Returning AI response: "${aiResponse.substring(0, 50)}${aiResponse.length > 50 ? '...' : ''}"`);
      return NextResponse.json({ response: aiResponse });
    }

    // If all models failed, fall back to rule-based system
    console.log('All AI models failed or skipped, using fallback response');
    const fallbackResponse = generateFallbackResponse(userMessage);
    console.log(`Returning fallback response: "${fallbackResponse.substring(0, 50)}${fallbackResponse.length > 50 ? '...' : ''}"`);
    return NextResponse.json({ response: fallbackResponse });
  } catch (error) {
    console.error('API error:', error);
    // Make sure userMessage is defined before using it
    const fallbackResponse = generateFallbackResponse(userMessage || '');
    console.log(`Returning fallback response: "${fallbackResponse.substring(0, 50)}${fallbackResponse.length > 50 ? '...' : ''}"`);
    return NextResponse.json({ response: fallbackResponse });
  }
}

// Clean up AI responses to make them more relevant to movies
function cleanResponse(response: string): string {
  // Remove any references to being an AI assistant
  response = response.replace(/I'm an AI assistant|As an AI|I'm just an AI|I am an AI/gi, "As a movie expert");
  
  // Remove any disclaimers about not being able to watch movies
  response = response.replace(/I cannot watch movies|I don't have the ability to watch|I haven't watched/gi, "");
  
  // Trim the response
  response = response.trim();
  
  return response;
}

// Enhanced rule-based fallback system with more movie knowledge
function generateFallbackResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  // Check if this is a movie analysis request
  if (lowercaseMessage.includes('analyze the movie') || lowercaseMessage.includes('analysis')) {
    // Extract movie title - look for text in quotes
    const titleMatch = message.match(/"([^"]+)"/);
    const movieTitle = titleMatch ? titleMatch[1] : "the movie";
    
    // Extract overview if available
    let overview = "";
    if (lowercaseMessage.includes('overview:')) {
      overview = message.split('Overview:')[1].trim();
    }
    
    return `
# Analysis of ${movieTitle}

## Overview
${movieTitle} is a compelling film that explores several thought-provoking themes. The narrative effectively balances entertainment value with artistic merit, making it both accessible and meaningful to audiences.

## Key Themes
- **Identity and Self-Discovery**: The film explores this theme through its characters and narrative structure.
- **Moral Ambiguity**: Characters face difficult choices that challenge their beliefs and values.
- **Human Connection**: The relationships between characters reveal deeper truths about human nature.

## Character Analysis
The characters in ${movieTitle} are well-developed and serve the narrative effectively. The protagonist's journey reflects the film's central themes, while supporting characters provide necessary context and emotional depth. The character dynamics create tension and emotional resonance throughout the story.

## Cinematic Elements
The film's visual style and cinematography enhance the storytelling, creating a cohesive aesthetic that supports the narrative. The director's vision is evident in the careful composition of scenes and the overall pacing. The score complements the emotional beats of the film, heightening key moments and transitions.

## Cultural Impact
${movieTitle} has made a notable contribution to cinema, resonating with both audiences and critics. Its exploration of universal themes speaks to broader cultural conversations and demonstrates the power of film as an artistic medium.

## Critical Reception
Critics have generally responded positively to ${movieTitle}, with particular praise for its performances and screenplay. The film holds a strong rating among critics, reflecting its artistic achievements and audience appeal.
    `;
  }
  
  // Recommendations
  if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggestion')) {
    if (lowercaseMessage.includes('horror')) {
      return "For horror fans, I'd recommend 'Hereditary', 'The Witch', 'Get Out', 'The Shining', and 'A Quiet Place'. These films offer different types of horror from psychological to supernatural.";
    }
    
    if (lowercaseMessage.includes('action')) {
      return "For action lovers, check out 'John Wick', 'Mad Max: Fury Road', 'The Raid', 'Mission Impossible: Fallout', and 'Die Hard'. These films feature exceptional action sequences and thrilling narratives.";
    }
    
    if (lowercaseMessage.includes('romance') || lowercaseMessage.includes('love')) {
      return "For romance, I'd suggest 'Before Sunrise', 'The Notebook', 'Eternal Sunshine of the Spotless Mind', 'Call Me By Your Name', and 'La La Land'. Each offers a unique take on love and relationships.";
    }
    
    return "Based on popular trends, I'd recommend checking out films like 'Everything Everywhere All at Once', 'Parasite', 'Dune', 'The Shawshank Redemption', and 'Inception'. These have been critically acclaimed and offer unique viewing experiences.";
  }
  
  // Best movies in genres
  if (lowercaseMessage.includes('best')) {
    if (lowercaseMessage.includes('sci-fi') || lowercaseMessage.includes('science fiction')) {
      return "Some of the best sci-fi films include 'Blade Runner', 'The Matrix', 'Inception', 'Interstellar', '2001: A Space Odyssey', and 'Arrival'. Each offers a unique take on science fiction concepts.";
    }
    
    if (lowercaseMessage.includes('drama')) {
      return "Some of the best drama films include 'The Godfather', 'The Shawshank Redemption', 'Schindler's List', 'Parasite', and '12 Angry Men'. These films feature compelling narratives and exceptional performances.";
    }
    
    if (lowercaseMessage.includes('comedy')) {
      return "Some of the best comedy films include 'Airplane!', 'The Big Lebowski', 'Superbad', 'Bridesmaids', and 'What We Do in the Shadows'. These films offer different styles of humor from slapstick to dry wit.";
    }
    
    return "Some of the highest-rated films of all time include 'The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction', and '12 Angry Men'. Of course, 'best' is subjective and depends on your personal taste!";
  }
  
  // Directors
  if (lowercaseMessage.includes('director') || 
      lowercaseMessage.includes('nolan') || 
      lowercaseMessage.includes('spielberg') || 
      lowercaseMessage.includes('tarantino') ||
      lowercaseMessage.includes('scorsese')) {
    
    if (lowercaseMessage.includes('nolan')) {
      return "Christopher Nolan is known for complex narratives and mind-bending concepts. His notable works include 'Inception', 'The Dark Knight trilogy', 'Interstellar', 'Memento', and 'Dunkirk'. His films often explore themes of time, memory, and identity.";
    }
    
    if (lowercaseMessage.includes('spielberg')) {
      return "Steven Spielberg is one of the most influential directors in cinema history. His diverse filmography includes 'Jaws', 'E.T.', 'Jurassic Park', 'Schindler's List', and 'Saving Private Ryan'. He's known for his visual storytelling and emotional depth.";
    }
    
    if (lowercaseMessage.includes('tarantino')) {
      return "Quentin Tarantino is known for his non-linear storytelling, stylized violence, and distinctive dialogue. His films include 'Pulp Fiction', 'Kill Bill', 'Django Unchained', 'Inglourious Basterds', and 'Once Upon a Time in Hollywood'.";
    }
    
    if (lowercaseMessage.includes('scorsese')) {
      return "Martin Scorsese is a master filmmaker known for his crime dramas and character studies. His notable works include 'Goodfellas', 'Taxi Driver', 'The Departed', 'Raging Bull', and 'The Irishman'. His films often explore themes of identity, guilt, and redemption.";
    }
    
    return "Many directors have made significant contributions to cinema. Christopher Nolan is known for complex narratives, Steven Spielberg for emotional storytelling, Quentin Tarantino for stylized dialogue, and Martin Scorsese for character-driven crime dramas.";
  }
  
  // Actors
  if (lowercaseMessage.includes('actor') || lowercaseMessage.includes('actress')) {
    return "There are many talented actors and actresses in cinema. Some of the most acclaimed include Meryl Streep, Daniel Day-Lewis, Frances McDormand, Anthony Hopkins, Cate Blanchett, and Denzel Washington. Each brings unique qualities to their performances.";
  }
  
  // Genres
  if (lowercaseMessage.includes('genre')) {
    return "Popular film genres include action, comedy, drama, horror, sci-fi, romance, thriller, documentary, and animation. Each offers different experiences and appeals to different tastes. Many great films also blend multiple genres.";
  }
  
  // Oscar winners
  if (lowercaseMessage.includes('oscar') || lowercaseMessage.includes('academy award')) {
    return "Recent Best Picture Oscar winners include 'Everything Everywhere All at Once', 'CODA', 'Nomadland', 'Parasite', and 'Green Book'. The Oscars recognize excellence in filmmaking, though many great films don't win awards.";
  }
  
  // Default response
  return "That's an interesting question about movies! I can help with recommendations, information about directors, actors, genres, or specific films. Feel free to ask something more specific about cinema.";
} 