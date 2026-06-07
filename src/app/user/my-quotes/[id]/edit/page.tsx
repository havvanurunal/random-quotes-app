import { getQuoteById } from '@/app/services/quotes';
import { auth0 } from '@/lib/auth0';
import EditQuoteClient from '@/components/EditQuoteClient';

export default async function EditQuotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  const quote = await getQuoteById(id);

  if (!quote || quote.userId !== userId) {
    return <div> You are not authorized to edit this quote.</div>;
  }

  return (
    <main className='min-h-dvh flex justify-center px-4'>
      <EditQuoteClient quote={quote} />
    </main>
  );
}
