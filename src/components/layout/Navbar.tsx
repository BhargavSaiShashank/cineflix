"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Compass, User, Film, Sparkles, Heart, Users, Calendar, Settings } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/settings/LanguageSelector';

const Navbar = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  useEffect(() => {
    console.log('Current pathname:', pathname);
  }, [pathname]);

  const navItems = [
    {
      label: t('common', 'home'),
      href: '/',
      icon: Home,
    },
    {
      label: t('common', 'discover'),
      href: '/discover',
      icon: Search,
    },
    {
      label: t('common', 'movies'),
      href: '/movies',
      icon: Film,
    },
    {
      label: t('common', 'collections'),
      href: '/collections',
      icon: Film,
    },
    {
      label: t('common', 'watchlist'),
      href: '/watchlist',
      icon: Heart,
    },
    {
      label: t('common', 'calendar'),
      href: '/calendar',
      icon: Calendar,
    },
    {
      label: t('common', 'friends'),
      href: '/friends',
      icon: Users,
    },
    {
      label: t('common', 'aiFeatures'),
      href: '/ai-features',
      icon: Sparkles,
    },
    {
      label: t('common', 'profile'),
      href: '/profile',
      icon: User,
    },
    {
      label: t('common', 'settings'),
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-800 bg-[#0f172a]/90 backdrop-blur-md md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="hidden md:block">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            CineFlix
          </div>
        </Link>
        <nav className="flex w-full items-center justify-around md:justify-end md:space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex flex-col items-center justify-center md:flex-row md:space-x-2 h-auto py-2 text-gray-400 hover:text-white",
                    isActive && "bg-[#1e293b] text-pink-500 hover:text-pink-400"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-pink-500")} />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </Button>
              </Link>
            );
          })}
          
          {/* Language Selector */}
          <div className="hidden md:block ml-4">
            <LanguageSelector variant="minimal" />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar; 