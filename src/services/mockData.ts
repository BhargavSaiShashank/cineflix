// Mock data for development purposes
import {
  generateMovies,
  generateMoviesByGenre,
  generateMoviesByDecade,
  generateHighRatedMovies,
  generateMovieCollections,
  generateDirectors,
  generateActors,
  generateReviews,
  availableGenres
} from './movieGenerator';

// Keep the original 30 movies
export const originalMovies = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterPath: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    rating: 8.4,
    year: "2010",
    genres: ["Sci-Fi", "Action", "Thriller"]
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterPath: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    rating: 9.3,
    year: "1994",
    genres: ["Drama", "Crime"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterPath: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    rating: 9.0,
    year: "2008",
    genres: ["Action", "Crime", "Drama", "Thriller"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterPath: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    rating: 8.9,
    year: "1994",
    genres: ["Crime", "Drama", "Thriller"]
  },
  {
    id: 5,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    posterPath: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
    rating: 8.8,
    year: "1999",
    genres: ["Drama", "Thriller"]
  },
  {
    id: 6,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    posterPath: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    rating: 8.8,
    year: "1994",
    genres: ["Drama", "Romance", "Comedy"]
  },
  {
    id: 7,
    title: "The Matrix",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    posterPath: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    rating: 8.7,
    year: "1999",
    genres: ["Action", "Sci-Fi"]
  },
  {
    id: 8,
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    posterPath: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCud90M.jpg",
    rating: 8.7,
    year: "1990",
    genres: ["Crime", "Drama"]
  },
  {
    id: 9,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterPath: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    rating: 8.6,
    year: "2014",
    genres: ["Adventure", "Drama", "Sci-Fi"]
  },
  {
    id: 10,
    title: "Spirited Away",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    posterPath: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg",
    rating: 8.6,
    year: "2001",
    genres: ["Animation", "Family", "Fantasy"]
  },
  // Additional movies (17-30)
  {
    id: 17,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    posterPath: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    rating: 8.3,
    year: "2019",
    genres: ["Action", "Adventure", "Sci-Fi"]
  },
  {
    id: 18,
    title: "The Godfather: Part II",
    overview: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    posterPath: "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
    rating: 9.0,
    year: "1974",
    genres: ["Crime", "Drama"]
  },
  {
    id: 19,
    title: "The Green Mile",
    overview: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    posterPath: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg",
    rating: 8.6,
    year: "1999",
    genres: ["Crime", "Drama", "Fantasy"]
  },
  {
    id: 20,
    title: "Whiplash",
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterPath: "https://image.tmdb.org/t/p/w500/6uSPcdGMzZNawasVCdQSFJUh8F7.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/fRGxZuo7jJUWQsVg9PREb98Aclp.jpg",
    rating: 8.5,
    year: "2014",
    genres: ["Drama", "Music"]
  },
  {
    id: 21,
    title: "Joker",
    overview: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    posterPath: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    rating: 8.4,
    year: "2019",
    genres: ["Crime", "Drama", "Thriller"]
  },
  {
    id: 22,
    title: "Your Name",
    overview: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    posterPath: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
    rating: 8.5,
    year: "2016",
    genres: ["Animation", "Drama", "Fantasy", "Romance"]
  },
  {
    id: 23,
    title: "The Departed",
    overview: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    posterPath: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq8ynT4gSQZU.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/8Od5zV7Q7zNOX0y9tyNgpTmoiGA.jpg",
    rating: 8.5,
    year: "2006",
    genres: ["Crime", "Drama", "Thriller"]
  },
  {
    id: 24,
    title: "Gladiator",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    posterPath: "https://image.tmdb.org/t/p/w500/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/hND7xAaxxBgaIspp9iHr1P8FbG.jpg",
    rating: 8.5,
    year: "2000",
    genres: ["Action", "Adventure", "Drama"]
  },
  {
    id: 25,
    title: "The Lion King",
    overview: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    posterPath: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLm72yY7w.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/wXsQvli6tWqja8cci39QzRrjUV1.jpg",
    rating: 8.5,
    year: "1994",
    genres: ["Animation", "Adventure", "Drama", "Family"]
  },
  {
    id: 26,
    title: "The Prestige",
    overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    posterPath: "https://image.tmdb.org/t/p/w500/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/c3OhLX8PX5O4q6EbgWORGrN3Vff.jpg",
    rating: 8.5,
    year: "2006",
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"]
  },
  {
    id: 27,
    title: "Parasite",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    posterPath: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    rating: 8.6,
    year: "2019",
    genres: ["Comedy", "Drama", "Thriller"]
  },
  {
    id: 28,
    title: "Back to the Future",
    overview: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    posterPath: "https://image.tmdb.org/t/p/w500/7lyBcpYB0Qt8gYhXYaEZUNlO8gW.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/fq3wyOs1RHyz2yfzsb4sck7aWRG.jpg",
    rating: 8.5,
    year: "1985",
    genres: ["Adventure", "Comedy", "Sci-Fi"]
  },
  {
    id: 29,
    title: "Alien",
    overview: "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    posterPath: "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg",
    rating: 8.4,
    year: "1979",
    genres: ["Horror", "Sci-Fi"]
  },
  {
    id: 30,
    title: "Django Unchained",
    overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    posterPath: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/2oZklIzUbvZXXzIFzv7Hi68d6xf.jpg",
    rating: 8.4,
    year: "2012",
    genres: ["Drama", "Western"]
  }
];

// Reduce the number of generated movies to prevent memory issues
// Generate a smaller dataset of movies (50 random movies instead of 200)
const generatedMovies = generateMovies(50, 100);

// Generate fewer genre-specific movies (10 per genre instead of 20)
const actionMovies = generateMoviesByGenre("Action", 10, 200);
const dramaMovies = generateMoviesByGenre("Drama", 10, 300);
const sciFiMovies = generateMoviesByGenre("Science Fiction", 10, 400);
const comedyMovies = generateMoviesByGenre("Comedy", 10, 500);

// Generate fewer decade-specific movies (5 per decade instead of 15)
const moviesFrom1980s = generateMoviesByDecade("1980", 5, 600);
const moviesFrom1990s = generateMoviesByDecade("1990", 5, 650);
const moviesFrom2000s = generateMoviesByDecade("2000", 5, 700);
const moviesFrom2010s = generateMoviesByDecade("2010", 5, 750);
const moviesFrom2020s = generateMoviesByDecade("2020", 5, 800);

// Generate fewer high-rated movies (15 instead of 30)
const highRatedMovies = generateHighRatedMovies(15, 900);

// Generate fewer movie collections (5 collections with 3 movies each instead of 10 with 5)
const { collections: generatedCollections, movies: collectionMovies } = generateMovieCollections(5, 3);

// Combine all movies into one large array
export const mockMovies = [
  ...originalMovies.slice(0, 30), // Keep the first 30 original movies
  ...generatedMovies,
  ...actionMovies,
  ...dramaMovies,
  ...sciFiMovies,
  ...comedyMovies,
  ...moviesFrom1980s,
  ...moviesFrom1990s,
  ...moviesFrom2000s,
  ...moviesFrom2010s,
  ...moviesFrom2020s,
  ...highRatedMovies,
  ...collectionMovies
];

// Generate trending movies (mix of original and generated)
export const mockTrendingMovies = [
  ...originalMovies.slice(0, 5),
  ...generatedMovies.slice(0, 5),
  ...highRatedMovies.slice(0, 5)
];

// Generate top rated movies
export const mockTopRatedMovies = [
  ...originalMovies.slice(1, 5),
  ...highRatedMovies.slice(0, 10)
];

// Generate recommended movies
export const mockRecommendedMovies = [
  ...originalMovies.slice(4, 8),
  ...generatedMovies.slice(5, 15)
];

// Generate fewer directors (15 instead of 30)
export const mockDirectors = generateDirectors(15);

// Generate fewer actors (25 instead of 50)
export const mockActors = generateActors(25);

// Generate fewer reviews (100 instead of 300)
export const mockReviews = generateReviews(
  mockMovies.slice(0, 50).map(movie => movie.id), 
  100
);

// Use the available genres from the generator
export const mockGenres = availableGenres;

// Generate collections (combine original and generated)
export const mockCollections = [
  {
    id: 1,
    name: "The Dark Knight Trilogy",
    overview: "Christopher Nolan's groundbreaking trilogy that redefined the superhero genre.",
    posterPath: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    movies: [3]
  },
  {
    id: 2,
    name: "Christopher Nolan Films",
    overview: "Mind-bending films from one of Hollywood's most innovative directors.",
    posterPath: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    movies: [1, 3, 9, 26]
  },
  ...generatedCollections
];

// Generate genre-specific collections (limit to 10 movies per collection)
export const genreCollections = availableGenres.map((genre, index) => {
  const genreMovies = mockMovies
    .filter(movie => movie.genres && movie.genres.includes(genre.name))
    .slice(0, 10) // Limit to 10 movies per genre collection
    .map(movie => movie.id);
    
  if (genreMovies.length === 0) return null;
  
  const sampleMovie = mockMovies.find(movie => movie.genres && movie.genres.includes(genre.name));
  
  return {
    id: 100 + index,
    name: `Best ${genre.name} Movies`,
    overview: `A collection of the best ${genre.name.toLowerCase()} films of all time.`,
    posterPath: sampleMovie?.posterPath || "",
    backdropPath: sampleMovie?.backdropPath || "",
    movies: genreMovies
  };
}).filter(Boolean);

// Add decade collections (limit to 10 movies per collection)
export const decadeCollections = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"].map((decade, index) => {
  const decadePrefix = decade.substring(0, 4);
  const decadeMovies = mockMovies
    .filter(movie => movie.year && movie.year.startsWith(decadePrefix))
    .slice(0, 10) // Limit to 10 movies per decade collection
    .map(movie => movie.id);
    
  if (decadeMovies.length === 0) return null;
  
  const sampleMovie = mockMovies.find(movie => movie.year && movie.year.startsWith(decadePrefix));
  
  return {
    id: 200 + index,
    name: `${decade} Classics`,
    overview: `The most memorable films from the ${decade}.`,
    posterPath: sampleMovie?.posterPath || "",
    backdropPath: sampleMovie?.backdropPath || "",
    movies: decadeMovies
  };
}).filter(Boolean);

// Combine all collections
export const allCollections = [
  ...mockCollections,
  ...genreCollections,
  ...decadeCollections
]; 