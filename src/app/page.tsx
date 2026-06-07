import HomeClient from '@/components/HomeClient';
import { getQuotes } from '@/app/services/quotes';
import { auth0 } from '@/lib/auth0';

export default async function Home() {
  const quotes = await getQuotes();
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='action-card'>
        <HomeClient quotes={quotes} userId={userId} />
      </div>
    </main>
  );
}
