import HomeClient from '@/components/HomeClient';
import { auth0 } from '@/lib/auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='action-card'>
        <HomeClient />
      </div>
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags.
