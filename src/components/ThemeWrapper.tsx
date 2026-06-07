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
      className={`${
        theme === 'dark' ? 'dark' : ''
      } min-h-screen bg-background text-foreground`}
    >
      {children}
    </div>
  );
}
