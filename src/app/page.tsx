import HomeClient from './HomeClient';
import { auth0 } from '@/lib/auth0';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import Profile from '@/components/Profile';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='action-card'>
        {user ? (
          <HomeClient />
        ) : (
          <>
            <p className=''>
              Welcome! Please log in to access your protected content.
            </p>
            <LoginButton />
          </>
        )}
      </div>
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags.
