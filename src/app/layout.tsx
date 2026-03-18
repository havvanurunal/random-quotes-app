import { Geist, Geist_Mono } from 'next/font/google';
import { QuotesProvider } from '@/app/QuotesContext';
import { ThemeProvider } from './ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { MobileMenu } from '../components/MobileMenu';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import './globals.css';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { auth0 } from '@/lib/auth0';
import LoginButton from '@/components/LoginButton';
import { TypographyH1 } from '@/components/ui/h1';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Random Quotes App',
  description: 'A simple app that displays random quotes.',
};

export default async function RootLayout({ children }) {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemeWrapper>
            <NavigationMenu className='flex flex-col max-w-full px-4 py-2'>
              <div className='hidden md:block ml-auto mt-3'>
                <ThemeToggle />
              </div>
              <NavigationMenuList className='hidden md:flex items-baseline'>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} bg-color-none`}
                  >
                    <Link href='/'>Home Page</Link>
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
                        <Link href='/user/quotes/'>Liked Quotes</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={`${navigationMenuTriggerStyle()} bg-color-none`}
                      >
                        <Link href='/user/profile/'>Profile</Link>
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
                        <Link href='/auth/login?screen_hint=signup'>
                          Sign Up
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
              <MobileMenu user={!!user} />
            </NavigationMenu>
            {user ? (
              <QuotesProvider>{children}</QuotesProvider>
            ) : (
              <main className='min-h-dvh max-w-xl mx-auto flex flex-col items-center justify-center text-center gap-8'>
                <TypographyH1>
                  Welcome! Please log in to access your protected content.
                </TypographyH1>
                <LoginButton />
              </main>
            )}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
