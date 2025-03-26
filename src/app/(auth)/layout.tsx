import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - CineFlix',
  description: 'Sign in or create an account to access CineFlix',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - Auth form */}
      <div className="flex flex-col justify-center w-full px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-2/5">
        <div className="flex flex-col items-center w-full max-w-sm mx-auto lg:w-96">
          <div className="w-full text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="CineFlix Logo"
                  width={48}
                  height={48}
                  className="mr-2"
                />
                <h1 className="text-2xl font-bold text-white">CineFlix</h1>
              </div>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Your personal movie companion
            </p>
          </div>
          
          {/* Auth form container */}
          <div className="w-full p-6 sm:p-8 bg-gray-900/60 rounded-xl border border-gray-800 backdrop-blur-sm">
            {children}
          </div>
          
          {/* Footer links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Movie backdrop */}
      <div className="hidden lg:block relative lg:w-1/2 xl:w-3/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/auth-backdrop.jpg"
          alt="Movie collage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center z-20 p-12">
          <blockquote className="max-w-lg">
            <p className="text-2xl font-medium text-white">
              &quot;Cinema is a matter of what&apos;s in the frame and what&apos;s out.&quot;
            </p>
            <footer className="mt-4">
              <cite className="text-lg text-gray-300 not-italic">
                — Martin Scorsese
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
} 