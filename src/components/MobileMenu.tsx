'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

type MobileMenuProps = {
  user: boolean;
};

export function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      {!isOpen && (
        <div className='absolute top-0 w-full left-0 p-2'>
          <Button
            variant='ghost'
            onClick={() => setIsOpen(true)}
            aria-label='Open menu'
            className='self-start text-xl mb-4 cursor-pointer'
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
          <ThemeToggle />
        </div>
      )}

      {isOpen && (
        <div className='absolute top-0 w-full left-0 flex flex-col gap-3 bg-slate-600 p-6 z-10 list-none'>
          <Button
            variant='ghost'
            onClick={() => setIsOpen(false)}
            aria-label='Close menu'
            className='self-end text-white text-xl mb-4 hover:text-gray-300 cursor-pointer'
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

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-color-none`}
            >
              <Link href='/' onClick={() => setIsOpen(false)}>
                Home Page
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {user && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/user/quotes/new'>New Quote</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/user/quotes/' onClick={() => setIsOpen(false)}>
                    Liked Quotes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/user/profile/' onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/auth/logout/'>Log Out</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}

          {!user && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/auth/login/'>Log In</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-color-none`}
                >
                  <Link href='/auth/login?screen_hint=signup'>Sign Up</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </div>
      )}
    </div>
  );
}
