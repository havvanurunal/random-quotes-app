'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    // runs once when components mounts
    if (typeof window !== 'undefined') {
      // this code only runs in the browser.
      const savedTheme = localStorage.getItem('theme'); // checks localStorage for the key 'currentIndex'
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // runs every time currentIndex changes and saves the currentIndex to localStorage.
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
