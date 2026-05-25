import { getLikedQuotes } from '@/app/services/quotes';
import LikedQuotesClient from '@/components/LikedQuotesClient';
import { auth0 } from '@/lib/auth0';

export default async function UserQuotes() {
  const likedQuotes = await getLikedQuotes();
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  return (
    <main className='min-h-dvh flex justify-center px-4'>
      <LikedQuotesClient quotes={likedQuotes} />
    </main>
  );
}
