'use client';
import Link from 'next/link';
import { useTheme } from '@/app/ThemeContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className='bg-slate-600 p-4'>
      <div className='flex justify-center items-center relative'>
        <div className='flex gap-4'>
          <Link href='/' className='text-white hover:text-slate-200'>
            Home</Link>
          <Link href='/user/quotes' className='text-white hover:text-slate-200' target='_blank'>Liked Quotes</Link>
        </div>
        <button onClick={toggleTheme} className='text-2xl absolute right-0'>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}