// Movie generator utility to create large datasets of movies

import { v4 as uuidv4 } from 'uuid';

// Base movie data to build upon
const baseMovieTitles = [
  "The Adventure", "Lost in Time", "Eternal Sunshine", "Midnight Express", "The Last Stand",
  "Forgotten Dreams", "City of Stars", "The Dark Forest", "Ocean's Horizon", "Whispers in the Wind",
  "Broken Memories", "The Silent Echo", "Rising Phoenix", "Shadow of Doubt", "Crimson Tide",
  "Starlight Journey", "The Hidden Truth", "Frozen Heart", "Emerald City", "The Final Chapter",
  "Distant Horizons", "Shattered Glass", "Golden Opportunity", "The Secret Garden", "Infinite Possibilities",
  "Dangerous Minds", "The Perfect Storm", "Fading Twilight", "Crystal Clear", "Beyond the Horizon"
];

const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", 
  "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", 
  "Thriller", "War", "Western"
];

const decades = ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020"];
const ratings = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5];

// Generate a random movie
export function generateRandomMovie(id: number) {
  // Create a base title
  const baseTitle = baseMovieTitles[Math.floor(Math.random() * baseMovieTitles.length)];
  
  // Add some variation to make each title unique
  const adjectives = ["New", "Ultimate", "Epic", "Incredible", "Amazing", "Fantastic", "Spectacular"];
  const useAdjective = Math.random() > 0.7;
  const useNumber = Math.random() > 0.8;
  const number = Math.floor(Math.random() * 5) + 1;
  
  let title = baseTitle;
  if (useAdjective) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    title = `The ${adj} ${baseTitle}`;
  }
  if (useNumber) {
    title = `${title} ${number}`;
  }
  
  // Generate random year from a decade
  const decade = decades[Math.floor(Math.random() * decades.length)];
  const year = (parseInt(decade) + Math.floor(Math.random() * 9)).toString();
  
  // Generate random rating
  const baseRating = ratings[Math.floor(Math.random() * ratings.length)];
  const rating = Math.round((baseRating + (Math.random() * 0.9 - 0.4)) * 10) / 10;
  
  // Generate random genres (1-3)
  const numGenres = Math.floor(Math.random() * 3) + 1;
  const movieGenres = [];
  const usedGenreIndexes = new Set();
  
  for (let i = 0; i < numGenres; i++) {
    let genreIndex;
    do {
      genreIndex = Math.floor(Math.random() * genres.length);
    } while (usedGenreIndexes.has(genreIndex));
    
    usedGenreIndexes.add(genreIndex);
    movieGenres.push(genres[genreIndex]);
  }
  
  // Generate a random overview
  const overviews = [
    `A thrilling ${movieGenres[0].toLowerCase()} story about a protagonist who must overcome impossible odds.`,
    `In a world where nothing is as it seems, one person's journey changes everything.`,
    `Set in ${year}, this ${movieGenres.join("/")} film explores themes of love, loss, and redemption.`,
    `Critics call it "the defining ${movieGenres[0].toLowerCase()} film of the ${decade}s." A must-watch classic.`,
    `When disaster strikes, unlikely heroes must rise to save what matters most.`,
    `A powerful story of transformation set against the backdrop of a changing world.`,
    `What begins as a simple mission becomes a fight for survival in this edge-of-your-seat thriller.`,
    `Acclaimed director brings this bestselling novel to life with stunning visuals and powerful performances.`,
    `The boundaries between reality and fantasy blur in this mind-bending journey.`,
    `A character study that delves deep into the human condition, asking what it means to truly live.`
  ];
  
  const overview = overviews[Math.floor(Math.random() * overviews.length)];
  
  // Use a variety of TMDB placeholder images that are known to work with Next.js
  const posterImages = [
    "9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", // Inception
    "q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", // Shawshank
    "qJ2tW6WMUDux911r6m7haRef0WH.jpg", // Dark Knight
    "d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", // Pulp Fiction
    "pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", // Fight Club
    "arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", // Forrest Gump
    "f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", // Matrix
    "aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", // Goodfellas
    "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
    "39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", // Spirited Away
    "or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Avengers
    "hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", // Godfather II
    "velWPhVMQeQKcxggNEU8YmIo52R.jpg", // Green Mile
    "6uSPcdGMzZNawasVCdQSFJUh8F7.jpg", // Whiplash
    "udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"  // Joker
  ];
  
  const backdropImages = [
    "s3TBrRGB1iav7gFOCNx3H31MoES.jpg", // Inception
    "kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg", // Shawshank
    "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", // Dark Knight
    "suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg", // Pulp Fiction
    "rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg", // Fight Club
    "3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg", // Forrest Gump
    "fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg", // Matrix
    "sw7mordbZxgITU877yTpZCud90M.jpg", // Goodfellas
    "xJHokMbljvjADYdit5fK5VQsXEG.jpg", // Interstellar
    "bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg"  // Spirited Away
  ];
  
  const posterPath = `https://image.tmdb.org/t/p/w500/${posterImages[Math.floor(Math.random() * posterImages.length)]}`;
  const backdropPath = `https://image.tmdb.org/t/p/original/${backdropImages[Math.floor(Math.random() * backdropImages.length)]}`;
  
  return {
    id,
    title,
    overview,
    posterPath,
    backdropPath,
    rating,
    year,
    genres: movieGenres
  };
}

// Generate a large set of movies
export function generateMovies(count: number, startId: number = 100) {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateRandomMovie(startId + i));
  }
  return movies;
}

// Generate movies by genre
export function generateMoviesByGenre(genre: string, count: number, startId: number = 500) {
  const movies = [];
  for (let i = 0; i < count; i++) {
    const movie = generateRandomMovie(startId + i);
    movie.genres = [genre, ...movie.genres.filter(g => g !== genre).slice(0, 1)];
    movies.push(movie);
  }
  return movies;
}

// Generate movies by decade
export function generateMoviesByDecade(decade: string, count: number, startId: number = 800) {
  const movies = [];
  for (let i = 0; i < count; i++) {
    const movie = generateRandomMovie(startId + i);
    const year = (parseInt(decade) + Math.floor(Math.random() * 9)).toString();
    movie.year = year;
    movies.push(movie);
  }
  return movies;
}

// Generate high-rated movies
export function generateHighRatedMovies(count: number, startId: number = 1100) {
  const movies = [];
  for (let i = 0; i < count; i++) {
    const movie = generateRandomMovie(startId + i);
    movie.rating = Math.round((8.5 + (Math.random() * 1.0)) * 10) / 10;
    if (movie.rating > 10) movie.rating = 10;
    movies.push(movie);
  }
  return movies;
}

// Generate collections of related movies
export function generateMovieCollections(count: number, moviesPerCollection: number = 5) {
  const collections = [];
  let movieId = 1500;
  
  // Collection poster and backdrop images
  const collectionPosterImages = [
    "qJ2tW6WMUDux911r6m7haRef0WH.jpg", // Dark Knight
    "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
    "or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Avengers
    "hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg", // Godfather II
    "7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg", // Django Unchained
    "q719jXXEzOoYaps6babgKnONONX.jpg", // Your Name
    "7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"  // Parasite
  ];
  
  const collectionBackdropImages = [
    "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", // Dark Knight
    "xJHokMbljvjADYdit5fK5VQsXEG.jpg", // Interstellar
    "7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", // Avengers
    "kGzFbGhp99zva6oZODW5atUtnqi.jpg", // Godfather II
    "2oZklIzUbvZXXzIFzv7Hi68d6xf.jpg", // Django Unchained
    "mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg", // Your Name
    "TU9NIjwzjoKPwQHoHshkFcQUCG.jpg"  // Parasite
  ];
  
  for (let i = 0; i < count; i++) {
    const collectionMovies = [];
    const baseTitle = baseMovieTitles[Math.floor(Math.random() * baseMovieTitles.length)];
    
    // Generate a collection of related movies (like a franchise)
    for (let j = 0; j < moviesPerCollection; j++) {
      const movie = generateRandomMovie(movieId++);
      movie.title = `${baseTitle}: ${['Origins', 'Chapter 2', 'The Return', 'Legacy', 'Final Chapter'][j]}`;
      collectionMovies.push(movie);
    }
    
    // Select random poster and backdrop for the collection
    const posterIndex = Math.floor(Math.random() * collectionPosterImages.length);
    const backdropIndex = Math.floor(Math.random() * collectionBackdropImages.length);
    
    collections.push({
      id: i + 1,
      name: `The ${baseTitle} Collection`,
      overview: `The complete collection of the ${baseTitle} franchise.`,
      posterPath: `https://image.tmdb.org/t/p/w500/${collectionPosterImages[posterIndex]}`,
      backdropPath: `https://image.tmdb.org/t/p/original/${collectionBackdropImages[backdropIndex]}`,
      movies: collectionMovies.map(m => m.id)
    });
  }
  
  return { collections, movies: collections.flatMap(c => 
    c.movies.map(id => collections.find(coll => coll.movies.includes(id))?.movies)
      .flat()
      .map(movieId => {
        const allMovies = collections.flatMap(c => c.movies);
        return allMovies.find(m => m.id === movieId);
      })
      .filter(Boolean)
  )};
}

// Export all available genres
export const availableGenres = genres.map((name, id) => ({ id: id + 1, name }));

// Generate directors
export function generateDirectors(count: number) {
  const firstNames = ["James", "Steven", "Christopher", "Martin", "Quentin", "David", "Francis", "Sofia", "Kathryn", "Greta", "Ava", "Denis", "Ridley", "Wes", "Spike", "Tim", "Guillermo", "Alfonso", "Darren", "Bong"];
  const lastNames = ["Cameron", "Spielberg", "Nolan", "Scorsese", "Tarantino", "Fincher", "Coppola", "Gerwig", "Bigelow", "Jenkins", "Villeneuve", "Scott", "Anderson", "Lee", "Burton", "del Toro", "Cuarón", "Aronofsky", "Joon-ho"];
  
  // Director profile images
  const directorImages = [
    "xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg", // Christopher Nolan
    "7r4FieFCCM8YJkWa2wWnAGrxaVz.jpg", // Steven Spielberg
    "4PigBnN5zt9Za5ZYPXlWAqXEUoZ.jpg", // Martin Scorsese
    "1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg", // Quentin Tarantino
    "5B5zGmkWYJwwB5UxAr8PvK1BO2h.jpg", // Sofia Coppola
    "roXPta5fAmGzMFmgUMXrjW8RlOx.jpg", // Greta Gerwig
    "llkZCMfWZbLPhZCZIK1iq8sZpGq.jpg", // Denis Villeneuve
    "oqUBdSj0jHvkEFcYQp0JKfQW7Ez.jpg"  // Wes Anderson
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const imageUrl = `https://image.tmdb.org/t/p/w500/${directorImages[Math.floor(Math.random() * directorImages.length)]}`;
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      imageUrl
    };
  });
}

// Generate actors
export function generateActors(count: number) {
  const firstNames = ["Tom", "Brad", "Leonardo", "Jennifer", "Scarlett", "Meryl", "Denzel", "Robert", "Emma", "Natalie", "Cate", "Morgan", "Samuel", "Viola", "Anthony", "Joaquin", "Christian", "Kate", "Charlize", "Daniel"];
  const lastNames = ["Hanks", "Pitt", "DiCaprio", "Lawrence", "Johansson", "Streep", "Washington", "De Niro", "Stone", "Portman", "Blanchett", "Freeman", "Jackson", "Davis", "Hopkins", "Phoenix", "Bale", "Winslet", "Theron", "Day-Lewis"];
  
  // Actor profile images
  const actorImages = [
    "wo2hJpn04vbtmh0B9utCFdsQhxM.jpg", // Leonardo DiCaprio
    "lldeQ91GwIVjZBfokgJMz5vbQyY.jpg", // Tom Hanks
    "cckcYc2v0yh1tc9QjRelptcOBko.jpg", // Brad Pitt
    "sRLC052ieEzkQs9dEtPMfFxYkej.jpg", // Scarlett Johansson
    "euDPyqLnuwaWMHajcU3oZ9uZezR.jpg", // Jennifer Lawrence
    "8Bc9rYnqGRUvyJGJJrnDgbDYTJy.jpg", // Meryl Streep
    "bqE2QpbMvGWGHGM29PBHVPwQJex.jpg", // Denzel Washington
    "cT8htcckIuyI1Lqwt1CvD02ynTh.jpg", // Robert De Niro
    "xqvX5A24dbIWaeYsMTxxKX5qOfz.jpg", // Emma Stone
    "n4DD1AYU7WEMNPLgn8zC25XSHzV.jpg"  // Natalie Portman
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const imageUrl = `https://image.tmdb.org/t/p/w500/${actorImages[Math.floor(Math.random() * actorImages.length)]}`;
    
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      imageUrl
    };
  });
}

// Generate reviews
export function generateReviews(movieIds: number[], count: number) {
  const reviewers = ["MovieBuff42", "CinematicVision", "FilmFanatic", "ScreenSage", "ReelReviewer", "MovieMaven", "CelluloidCritic", "FlickFan", "CinephileSupreme", "TheatricalThoughts"];
  const reviewContent = [
    "A masterpiece that redefines the genre. The performances are outstanding and the direction is impeccable.",
    "While it has its moments, the pacing issues and underdeveloped characters left me wanting more.",
    "An absolute triumph! The cinematography is breathtaking and the score perfectly complements every scene.",
    "A solid entry in the director's filmography, though it doesn't quite reach the heights of their previous work.",
    "I was completely immersed from start to finish. The storytelling is both innovative and emotionally resonant.",
    "The film struggles to find its footing, with a meandering plot that never quite comes together.",
    "A visual feast with substance to match. The themes explored are both timely and timeless.",
    "Despite strong performances from the lead actors, the script doesn't give them enough to work with.",
    "One of the most thought-provoking films I've seen this year. It will stay with you long after the credits roll.",
    "A disappointing effort that fails to live up to the promise of its premise. Style over substance."
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const movieId = movieIds[Math.floor(Math.random() * movieIds.length)];
    const user = reviewers[Math.floor(Math.random() * reviewers.length)];
    const content = reviewContent[Math.floor(Math.random() * reviewContent.length)];
    const rating = Math.round((Math.random() * 5 + 2.5) * 10) / 10; // Rating between 2.5 and 7.5
    
    // Generate a random date within the last year
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const formattedDate = date.toISOString().split('T')[0];
    
    return {
      id: i + 1,
      movieId,
      user,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      rating,
      date: formattedDate,
      content
    };
  });
} 