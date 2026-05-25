'use client';
import { useState } from 'react';
import { Quote } from '@/types/quotes';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/h2';
import { deleteQuoteAction } from '@/app/actions/quoteActions';

type MyQuotesClientProps = {
  quotes: Quote[];
  userId?: string;
};

export default function MyQuotesClient({ quotes }: MyQuotesClientProps) {
  const [myQuotes, setMyQuotes] = useState(quotes);

  async function handleDelete(quote: Quote) {
    await deleteQuoteAction(quote._id);
    setMyQuotes((prev) => prev.filter((q) => q._id !== quote._id));
  }

  return (
    <Card className='max-w-md w-full ring-0'>
      <CardTitle className='text-3xl font-bold font-sans text-center mb-6 mt-5'>
        My Quotes
      </CardTitle>

      {myQuotes.map((quote) => (
        <Card
          key={quote._id}
          className='flex flex-col w-full max-w-md my-6 mx-auto bg-slate-400 py-15 px-5 rounded-md'
        >
          <CardContent className='flex flex-col'>
            <TypographyH2>{quote.quote}</TypographyH2>
            <Body2>{quote.author}</Body2>
          </CardContent>

          <CardFooter className='flex justify-end border-none bg-slate-400 font-sans gap-2'>
            <a href={`/user/my-quotes/${quote._id}/edit`}>
              <Button
                variant='ghost'
                aria-label='Edit the quote'
                className='bg-green-700 text-white p-3'
              >
                Edit
              </Button>
            </a>

            <Button
              variant='destructive'
              onClick={() => handleDelete(quote)}
              aria-label='Delete quote'
              className='p-2 hover:bg-red-600 hover:text-white'
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Card>
  );
}
