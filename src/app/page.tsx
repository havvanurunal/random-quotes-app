import HomeClient from '@/components/HomeClient';
import { getQuotes } from '@/app/services/quotes';

export default async function Home() {
  const quotes = await getQuotes();

  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='action-card'>
        <HomeClient quotes={quotes} />
      </div>
    </main>
  );
}
