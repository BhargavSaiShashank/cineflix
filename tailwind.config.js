/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AI-centric movie recommendation color palette
        primary: {
          DEFAULT: '#6366F1', // Modern indigo - representing AI intelligence
          hover: '#818CF8',
          focus: '#4F46E5',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald - representing successful recommendations
          hover: '#34D399',
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#0F172A', // Slate dark - sophisticated tech background
          alt: '#1E293B', // Lighter tech surface
        },
        foreground: '#F8FAFC', // Crisp white text
        border: '#334155', // Refined tech border
        input: '#334155',
        ring: '#6366F1',
        destructive: {
          DEFAULT: '#EF4444', // Red for errors/warnings
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#334155',
          foreground: '#94A3B8', // Softer text
        },
        accent: {
          DEFAULT: '#10B981', // Success green
          secondary: '#F59E0B', // Amber for ratings
          tertiary: '#EC4899', // Pink for engagement
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#1E293B', // Elevated surface
          foreground: '#F8FAFC',
          hover: '#334155',
        },
        popover: {
          DEFAULT: '#1E293B',
          foreground: '#F8FAFC',
        },
        // AI-themed gradients
        gradients: {
          primary: 'linear-gradient(135deg, #6366F1, #EC4899)', // Tech gradient
          poster: 'linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0) 60%)',
          hero: 'linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.95))',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.95))',
        'gradient-poster': 'linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0) 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.DEFAULT), 0 0 20px rgba(99,102,241,0.5)',
        'card': '0 10px 15px -3px rgba(15, 23, 42, 0.6), 0 4px 6px -4px rgba(15, 23, 42, 0.4)',
        'poster': '0 20px 25px -5px rgba(15, 23, 42, 0.7), 0 8px 10px -6px rgba(15, 23, 42, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
} 