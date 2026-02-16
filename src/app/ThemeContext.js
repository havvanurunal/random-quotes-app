'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState();


  useEffect(() => { // runs once when components mounts
    if (typeof window !== 'undefined') { // this code only runs in the browser. 
      const savedTheme = localStorage.getItem('theme'); // checks localStorage for the key 'currentIndex'
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => { // runs every time currentIndex changes and saves the currentIndex to localStorage. 
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
