"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Search, Compass, User, Film, Sparkles, Heart, 
  Users, Calendar, Settings, Gamepad2, Menu, X, ChevronDown, Bell
} from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/settings/LanguageSelector';
import Logo from '@/components/ui/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Primary navigation items (shown on desktop)
  const primaryNavItems = [
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
      notificationCount: 3, // Example notification count
    },
  ];

  // Secondary navigation items (shown in dropdown on desktop)
  const secondaryNavItems = [
    {
      label: t('common', 'games'),
      href: '/games',
      icon: Gamepad2,
      notificationCount: 1, // Example notification for new game
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
  ];

  // User-related navigation items (shown in user dropdown on desktop)
  const userNavItems = [
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

  // All navigation items for mobile menu
  const allNavItems = [...primaryNavItems, ...secondaryNavItems, ...userNavItems];

  const NavItem = ({ item, isActive }) => (
    <Link href={item.href}>
      <Button
        variant="ghost"
        className={cn(
          "group relative flex items-center justify-center space-x-2 h-auto py-2.5 px-3",
          "text-muted-foreground/80 hover:text-primary",
          "bg-transparent",
          "transition-all duration-300",
          "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5",
          isActive && [
            "bg-gradient-to-r from-primary/10 via-accent-tertiary/10 to-secondary/10",
            "text-primary",
            "after:absolute after:bottom-0 after:left-0 after:right-0",
            "after:h-[2px] after:bg-gradient-to-r after:from-primary/60 after:via-accent-tertiary after:to-secondary/60"
          ]
        )}
      >
        <div className="relative flex items-center space-x-2">
          <div className="relative">
            <item.icon className={cn(
              "h-[18px] w-[18px] transition-all duration-300",
              "text-muted-foreground/70",
              "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
              isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
            )} />
            {item.notificationCount > 0 && (
              <Badge 
                className={cn(
                  "absolute -top-1.5 -right-1.5 h-3.5 w-3.5 p-0",
                  "flex items-center justify-center",
                  "bg-gradient-to-r from-primary via-accent-tertiary to-secondary",
                  "text-primary-foreground",
                  "text-[9px] font-medium",
                  "ring-2 ring-background/95"
                )}
                variant="default"
              >
                {item.notificationCount}
              </Badge>
            )}
          </div>
          <span className={cn(
            "text-sm font-medium",
            "transition-colors duration-300",
            "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent"
          )}>
            {item.label}
          </span>
        </div>
      </Button>
    </Link>
  );

  return (
    <div className={cn(
      "fixed top-0 left-0 z-50 w-full",
      "border-b border-border/10",
      "bg-background/75 backdrop-blur-xl",
      "shadow-lg shadow-primary/5"
    )}>
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Logo variant="default" showTagline={true} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Primary Nav Items */}
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return <NavItem key={item.href} item={item} isActive={isActive} />;
          })}

          {/* More Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "group flex items-center space-x-2 h-auto py-2.5 px-3",
                  "text-muted-foreground/80",
                  "transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5"
                )}
              >
                <span className="text-sm font-medium group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent">More</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-300 text-muted-foreground/70 group-hover:text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={cn(
                "w-56 bg-background/95 backdrop-blur-xl",
                "border border-border/10",
                "shadow-xl shadow-primary/5",
                "animate-in fade-in-0 zoom-in-95 duration-200"
              )}
            >
              <DropdownMenuLabel className="text-muted-foreground/90 font-medium px-2 py-1.5">
                Entertainment
              </DropdownMenuLabel>
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href} 
                      className={cn(
                        "flex items-center space-x-2 px-2 py-1.5",
                        "cursor-pointer relative group",
                        "transition-colors duration-300",
                        "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5",
                        isActive && "bg-gradient-to-r from-primary/10 via-accent-tertiary/10 to-secondary/10"
                      )}
                    >
                      <div className="relative">
                        <item.icon className={cn(
                          "h-4 w-4 transition-colors duration-300",
                          "text-muted-foreground/70",
                          "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                          isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                        )} />
                        {item.notificationCount > 0 && (
                          <Badge 
                            className={cn(
                              "absolute -top-1.5 -right-1.5 h-3 w-3 p-0",
                              "flex items-center justify-center",
                              "bg-gradient-to-r from-primary via-accent-tertiary to-secondary",
                              "text-primary-foreground",
                              "text-[8px] font-medium",
                              "ring-2 ring-background/95"
                            )}
                            variant="default"
                          >
                            {item.notificationCount}
                          </Badge>
                        )}
                      </div>
                      <span className={cn(
                        "font-medium text-muted-foreground/80",
                        "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                        isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            className={cn(
              "group relative h-auto py-2.5 px-3",
              "text-muted-foreground/80",
              "transition-all duration-300",
              "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5"
            )}
          >
            <Bell className="h-[18px] w-[18px] transition-colors duration-300 text-muted-foreground/70 group-hover:text-primary" />
            <Badge 
              className={cn(
                "absolute -top-1.5 -right-1.5 h-3.5 w-3.5 p-0",
                "flex items-center justify-center",
                "bg-gradient-to-r from-primary via-accent-tertiary to-secondary",
                "text-primary-foreground",
                "text-[9px] font-medium",
                "ring-2 ring-background/95"
              )}
              variant="default"
            >
              4
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "group flex items-center space-x-2 h-auto py-2.5 px-3",
                  "text-muted-foreground/80",
                  "transition-all duration-300",
                  "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5"
                )}
              >
                <User className="h-[18px] w-[18px] transition-colors duration-300 text-muted-foreground/70 group-hover:text-primary" />
                <ChevronDown className="h-4 w-4 transition-transform duration-300 text-muted-foreground/70 group-hover:text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={cn(
                "w-56 bg-background/95 backdrop-blur-xl",
                "border border-border/10",
                "shadow-xl shadow-primary/5",
                "animate-in fade-in-0 zoom-in-95 duration-200"
              )}
            >
              <DropdownMenuLabel className="text-muted-foreground/90 font-medium px-2 py-1.5">
                Account
              </DropdownMenuLabel>
              {userNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href} 
                      className={cn(
                        "flex items-center space-x-2 px-2 py-1.5",
                        "cursor-pointer relative group",
                        "transition-colors duration-300",
                        "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5",
                        isActive && "bg-gradient-to-r from-primary/10 via-accent-tertiary/10 to-secondary/10"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors duration-300",
                        "text-muted-foreground/70",
                        "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                        isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                      )} />
                      <span className={cn(
                        "font-medium text-muted-foreground/80",
                        "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                        isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator className="bg-border/10" />
              <div className="p-1.5">
                <LanguageSelector variant="minimal" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "text-muted-foreground/80",
              "transition-colors duration-300",
              "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5"
            )}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={cn(
          "md:hidden",
          "bg-background/95 backdrop-blur-xl",
          "border-t border-border/10",
          "animate-in slide-in-from-top duration-300",
          "shadow-xl shadow-primary/5"
        )}>
          <div className="container py-3 space-y-0.5">
            {allNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div 
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-md",
                      "transition-colors duration-300 group",
                      "hover:bg-gradient-to-r hover:from-primary/5 hover:via-accent-tertiary/5 hover:to-secondary/5",
                      isActive && "bg-gradient-to-r from-primary/10 via-accent-tertiary/10 to-secondary/10"
                    )}
                  >
                    <item.icon className={cn(
                      "h-[18px] w-[18px] transition-colors duration-300",
                      "text-muted-foreground/70",
                      "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                      isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                    )} />
                    <span className={cn(
                      "font-medium text-muted-foreground/80",
                      "group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent-tertiary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent",
                      isActive && "bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent"
                    )}>
                      {item.label}
                    </span>
                    {item.notificationCount > 0 && (
                      <Badge 
                        className={cn(
                          "ml-auto h-3.5 w-3.5 p-0",
                          "flex items-center justify-center",
                          "bg-gradient-to-r from-primary via-accent-tertiary to-secondary",
                          "text-primary-foreground",
                          "text-[9px] font-medium",
                          "ring-2 ring-background/95"
                        )}
                        variant="default"
                      >
                        {item.notificationCount}
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar; 