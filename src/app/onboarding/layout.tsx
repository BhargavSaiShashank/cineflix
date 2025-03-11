import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Your Profile - CineFlix',
  description: 'Set up your CineFlix profile to get personalized movie recommendations',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {children}
    </div>
  );
} 