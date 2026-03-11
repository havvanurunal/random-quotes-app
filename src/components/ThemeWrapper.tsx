'use client';
import { useTheme } from '@/app/ThemeContext';
import { ReactNode } from 'react';

type ThemeWrapperProps = {
  children: ReactNode;
};
export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === 'dark'
          ? 'bg-black text-white min-h-screen'
          : 'bg-white text-black min-h-screen'
      }
    >
      {children}
    </div>
  );
}
