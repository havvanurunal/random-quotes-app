'use client';
import { useTheme } from '@/app/ThemeContext';

export function ThemeWrapper({ children }) {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      {children}
    </div>
  );
}