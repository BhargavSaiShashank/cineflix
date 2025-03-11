"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const callbackUrl = searchParams.get('callbackUrl') || '';

  // Check if user was redirected from sign-up
  useEffect(() => {
    if (registered === 'true') {
      setSuccessMessage('Account created successfully! Please sign in.');
      
      // Try to get the email from temp storage
      const tempUser = localStorage.getItem('temp_user');
      if (tempUser) {
        try {
          const userData = JSON.parse(tempUser);
          if (userData.email) {
            setEmail(userData.email);
          }
          // Clear temp user data
          localStorage.removeItem('temp_user');
        } catch (e) {
          console.error('Error parsing temp user data', e);
        }
      }
    }
  }, [registered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, callbackUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="text-sm text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>

      {successMessage && (
        <div className="p-3 text-sm bg-green-500/20 border border-green-500/50 text-green-200 rounded-md flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-3 text-sm bg-red-500/20 border border-red-500/50 text-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="/forgot-password" 
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          variant="gradient"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <p className="text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 