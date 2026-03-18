'use client';
import { useTheme } from '@/app/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant='ghost'
      onClick={toggleTheme}
      className='absolute right-0 text-2xl cursor-pointer text-white hover:bg-color-none'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
}
