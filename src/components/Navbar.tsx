'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/app/ThemeContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-slate-600 p-4 relative'>
      <div className='flex justify-center items-center relative p-4 md:p-0'>
        <div className=' md:hidden flex justify-center items-center'>
          {!isOpen && (
            <Button
              variant='ghost'
              className='absolute left-0 text-white text-3xl cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Open menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-7'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                />
              </svg>
            </Button>
          )}
        </div>

        <div className='hidden md:flex gap-4'>
          <Link
            href='/'
            className='text-white hover:text-slate-200 cursor-pointer'
          >
            Home
          </Link>
          <Link
            href='/user/quotes'
            className='text-white hover:text-slate-200 cursor-pointer'
          >
            Liked Quotes
          </Link>
          <Link
            href='/user/profile/login'
            className='text-white hover:text-slate-200 cursor-pointer'
          >
            Log In/Sign Up
          </Link>
        </div>
        <Button
          variant='ghost'
          onClick={toggleTheme}
          className='absolute text-2xl right-0 cursor-pointer'
          aria-label='Toggle menu'
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </Button>
      </div>

      {isOpen && (
        <div className='absolute top-0 w-full left-0 md:hidden flex flex-col gap-3 bg-slate-600 p-6 rounded shadow-lg z-10'>
          <Button
            variant='ghost'
            onClick={() => setIsOpen(false)}
            className='self-end text-white text-xl mb-4 hover:text-gray-300 cursor-pointer'
            aria-label='Close menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </Button>
          <Link
            href='/'
            className='text-white hover:text-slate-200 py-2 px-4 hover:bg-slate-600 rounded cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href='/user/quotes'
            className='text-white hover:text-slate-200 py-2 px-4 hover:bg-slate-600 rounded cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            Liked Quotes
          </Link>
          <Link
            href='/user/profile/login'
            className='text-white hover:text-slate-200 py-2 px-4 hover:bg-slate-600 rounded cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            Log In/Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
