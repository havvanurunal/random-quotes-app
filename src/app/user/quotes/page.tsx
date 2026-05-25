import { getLikedQuotes } from '@/app/services/quotes';
import LikedQuotesClient from '@/components/LikedQuotesClient';
import { auth0 } from '@/lib/auth0';

export default async function UserQuotes() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;
  if (!userId) {
    return (
      <main className='min-h-dvh flex justify-center px-4'>
        <p>Please log in to see liked quotes.</p>
      </main>
    );
  }
  const likedQuotes = await getLikedQuotes(userId);

  return (
    <main className='min-h-dvh flex justify-center px-4'>
      <LikedQuotesClient quotes={likedQuotes} userId={userId} />
    </main>
  );
}
