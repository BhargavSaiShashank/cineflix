"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Sample translations for demonstration
const translations: Translations = {
  // Common UI elements
  common: {
    en: {
      home: 'Home',
      discover: 'Discover',
      movies: 'Movies',
      collections: 'Collections',
      calendar: 'Calendar',
      friends: 'Friends',
      aiFeatures: 'AI Features',
      watchlist: 'Watchlist',
      profile: 'Profile',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      search: 'Search',
      settings: 'Settings',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
    es: {
      home: 'Inicio',
      discover: 'Descubrir',
      movies: 'Películas',
      collections: 'Colecciones',
      calendar: 'Calendario',
      friends: 'Amigos',
      aiFeatures: 'Funciones IA',
      watchlist: 'Lista de Seguimiento',
      profile: 'Perfil',
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
      signOut: 'Cerrar Sesión',
      search: 'Buscar',
      settings: 'Configuración',
      language: 'Idioma',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
    },
    fr: {
      home: 'Accueil',
      discover: 'Découvrir',
      movies: 'Films',
      collections: 'Collections',
      calendar: 'Calendrier',
      friends: 'Amis',
      aiFeatures: 'Fonctions IA',
      watchlist: 'Liste à Suivre',
      profile: 'Profil',
      signIn: 'Connexion',
      signUp: 'Inscription',
      signOut: 'Déconnexion',
      search: 'Rechercher',
      settings: 'Paramètres',
      language: 'Langue',
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair',
    },
  },
  
  // Movie-related translations
  movie: {
    en: {
      watchNow: 'Watch Now',
      addToWatchlist: 'Add to Watchlist',
      removeFromWatchlist: 'Remove from Watchlist',
      director: 'Director',
      cast: 'Cast',
      genre: 'Genre',
      releaseDate: 'Release Date',
      duration: 'Duration',
      rating: 'Rating',
      reviews: 'Reviews',
      similarMovies: 'Similar Movies',
      trailer: 'Trailer',
      synopsis: 'Synopsis',
    },
    es: {
      watchNow: 'Ver Ahora',
      addToWatchlist: 'Añadir a Lista',
      removeFromWatchlist: 'Quitar de Lista',
      director: 'Director',
      cast: 'Reparto',
      genre: 'Género',
      releaseDate: 'Fecha de Estreno',
      duration: 'Duración',
      rating: 'Calificación',
      reviews: 'Reseñas',
      similarMovies: 'Películas Similares',
      trailer: 'Tráiler',
      synopsis: 'Sinopsis',
    },
    fr: {
      watchNow: 'Regarder',
      addToWatchlist: 'Ajouter à la Liste',
      removeFromWatchlist: 'Retirer de la Liste',
      director: 'Réalisateur',
      cast: 'Distribution',
      genre: 'Genre',
      releaseDate: 'Date de Sortie',
      duration: 'Durée',
      rating: 'Évaluation',
      reviews: 'Critiques',
      similarMovies: 'Films Similaires',
      trailer: 'Bande-annonce',
      synopsis: 'Synopsis',
    },
  },
  
  // AI features translations
  ai: {
    en: {
      moodRecommendations: 'Mood Recommendations',
      customPrompt: 'Custom Prompt',
      whatsMood: "What's your mood today?",
      happy: 'Happy',
      sad: 'Sad',
      angry: 'Angry',
      romantic: 'Romantic',
      surprised: 'Surprised',
      thoughtful: 'Thoughtful',
      promptPlaceholder: 'Type a custom prompt (e.g., Movies like Inception)',
      generateRecommendations: 'Generate Recommendations',
    },
    es: {
      moodRecommendations: 'Recomendaciones por Estado de Ánimo',
      customPrompt: 'Consulta Personalizada',
      whatsMood: '¿Cuál es tu estado de ánimo hoy?',
      happy: 'Feliz',
      sad: 'Triste',
      angry: 'Enojado',
      romantic: 'Romántico',
      surprised: 'Sorprendido',
      thoughtful: 'Pensativo',
      promptPlaceholder: 'Escribe una consulta personalizada (ej., Películas como Inception)',
      generateRecommendations: 'Generar Recomendaciones',
    },
    fr: {
      moodRecommendations: 'Recommandations par Humeur',
      customPrompt: 'Requête Personnalisée',
      whatsMood: "Quelle est votre humeur aujourd'hui?",
      happy: 'Heureux',
      sad: 'Triste',
      angry: 'En colère',
      romantic: 'Romantique',
      surprised: 'Surpris',
      thoughtful: 'Pensif',
      promptPlaceholder: 'Tapez une requête personnalisée (ex., Films comme Inception)',
      generateRecommendations: 'Générer des Recommandations',
    },
  },
};

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (section: string, key: string) => string;
  availableLanguages: { code: Language; name: string }[];
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define available languages with their display names
const availableLanguages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'es' as Language, name: 'Español' },
  { code: 'fr' as Language, name: 'Français' },
  { code: 'de' as Language, name: 'Deutsch' },
  { code: 'ja' as Language, name: '日本語' },
  { code: 'zh' as Language, name: '中文' },
];

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with browser language or default to English
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (availableLanguages.some(lang => lang.code === browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (section: string, key: string): string => {
    // Check if section exists
    if (!translations[section]) {
      console.warn(`Translation section "${section}" not found`);
      return key;
    }

    // Check if language exists in section
    if (!translations[section][language]) {
      // Fallback to English
      if (translations[section]['en'] && translations[section]['en'][key]) {
        return translations[section]['en'][key];
      }
      console.warn(`Translation for language "${language}" in section "${section}" not found`);
      return key;
    }

    // Return translation or key if not found
    return translations[section][language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 