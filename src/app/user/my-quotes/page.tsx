import { getMyQuotes } from '@/app/services/quotes';
import { auth0 } from '@/lib/auth0';
import MyQuotesClient from '@/components/MyQuotesClient';

export default async function MyQuotesPage() {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  const quotes = await getMyQuotes(userId);

  return (
    <main className='min-h-dvh flex justify-center px-4'>
      <MyQuotesClient quotes={quotes} userId={userId} />
    </main>
  );
}
