"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export default function LanguageSelector({ variant = 'default', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Get current language display name
  const currentLanguage = availableLanguages.find(lang => lang.code === language)?.name || 'English';

  return (
    <div className={className}>
      {variant === 'default' ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white"
            >
              <Globe className="h-4 w-4" />
              <span>{currentLanguage}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-[#1e293b] border-gray-700 text-white"
          >
            {availableLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex items-center justify-between cursor-pointer ${
                  language === lang.code ? 'bg-pink-500/10 text-pink-500' : 'hover:bg-gray-800'
                }`}
                onClick={() => setLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                {language === lang.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-[#1e293b] border-gray-700 text-white"
          >
            {availableLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                className={`flex items-center justify-between cursor-pointer ${
                  language === lang.code ? 'bg-pink-500/10 text-pink-500' : 'hover:bg-gray-800'
                }`}
                onClick={() => setLanguage(lang.code)}
              >
                <span>{lang.name}</span>
                {language === lang.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
} 