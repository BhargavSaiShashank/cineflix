"use client";

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/ui/navbar';
import { Loader2 } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to sign-in if not authenticated
        router.push('/sign-in');
      } else if (user && !user.profileCompleted && !pathname.startsWith('/onboarding')) {
        // Redirect to profile setup if profile is not completed
        router.push('/onboarding/profile-setup');
      }
    }
  }, [isLoading, isAuthenticated, router, user, pathname]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated || (user && !user.profileCompleted && !pathname.startsWith('/onboarding'))) {
    return null;
  }

  // Render protected layout
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 