# CineFlix - AI-Powered Movie Recommendation App

CineFlix is a cross-platform AI movie recommendation application with an Instagram-inspired UI and Letterboxd-like features. Users can explore, review, and track movies based on their mood, preferences, and trending selections.

![CineFlix Screenshot](https://via.placeholder.com/800x400?text=CineFlix+Screenshot)

## 🚀 Features

- **AI-Driven Movie Suggestions**: Get personalized movie recommendations based on your emotions, genres, and watch history.
- **Featured Movie Sections**: Dynamic carousels showcasing trending movies, recommended picks, and user-created collections.
- **User Profiles**: Track your watch history, ratings, and favorites.
- **Community Features**: Follow other users, see their reviews, and create custom movie lists.
- **Modern UI**: Vibrant gradient-based theme with smooth animations and dark/light mode support.
- **Smart Search & Filters**: Find movies by title, genre, actor, or director with AI-powered suggestions.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **UI Components**: Radix UI, Framer Motion
- **State Management**: Zustand
- **API Integration**: TMDB API (The Movie Database)

## 📋 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cineflix.git
   cd cineflix
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📱 Multi-Platform Support

CineFlix is designed to be a cross-platform application:

- **Web App**: The current implementation using Next.js and React
- **Mobile App**: Planned implementation using React Native
- **Desktop App**: Planned implementation using Electron.js

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible UI components
