"use client";

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    markets: 'Markets',
    analysis: 'Analysis',
    trends: 'Trends',
    topGainers: 'Top Gainers',
    topLosers: 'Top Losers',
    searchCoins: 'Search coins...',
    noResults: 'No results found.',
    searchResults: 'Search Results',
    theme: {
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    }
  },
  ru: {
    dashboard: 'Дашборд',
    markets: 'Рынки',
    analysis: 'Анализ',
    trends: 'Тренды',
    topGainers: 'Лидеры роста',
    topLosers: 'Лидеры падения',
    searchCoins: 'Поиск монет...',
    noResults: 'Ничего не найдено.',
    searchResults: 'Результаты поиска',
    theme: {
      light: 'Светлая',
      dark: 'Темная',
      system: 'Системная'
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};