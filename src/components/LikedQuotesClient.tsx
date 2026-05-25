'use client';
import { useState } from 'react';
import { Quote } from '@/types/quotes';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/h2';
import { unlikeQuoteAction } from '@/app/actions/quoteActions';
import { Heart } from 'lucide-react';

type LikedQuotesClientProps = {
  quotes: Quote[];
  userId: string;
};

export default function LikedQuotesClient({
  quotes,
  userId,
}: LikedQuotesClientProps) {
  const [likedQuotes, setLikedQuotes] = useState(quotes);

  async function handleUnlike(quote: Quote) {
    await unlikeQuoteAction(quote._id);
    setLikedQuotes((prev) =>
      prev
        .map((q) =>
          q._id === quote._id
            ? { ...q, likedBy: q.likedBy.filter((id) => id !== userId) }
            : q
        )
        .filter((q) => q.likedBy.length > 0)
    );
  }

  return (
    <Card className='w-full ring-0 bg-transparent'>
      <CardTitle className='text-3xl font-bold font-sans text-center mb-6 mt-5'>
        Liked Quotes
      </CardTitle>

      <Card className='md:grid md:grid-cols-2 lg:grid-cols-3 lg:mx-15 lg:gap-4 ring-0 bg-transparent'>
        {likedQuotes.map((quote) => (
          <Card
            key={quote._id}
            className='flex flex-col w-full max-w-md my-6 mx-auto bg-slate-400 md:py-7 md:px-3 py-15 px-5 rounded-md'
          >
            <CardHeader className='flex items-center justify-end'>
              <Button
                size='icon'
                variant='ghost'
                className='text-2xl hover:bg-slate-400'
                onClick={() => handleUnlike(quote)}
                aria-label='Unlike quote'
              >
                <Heart className='text-red-500 size-7' fill='currentColor' />
              </Button>
              <span className='text-xl justify-end font-sans'>
                {quote.likedBy.length}
              </span>
            </CardHeader>
            <CardContent className='flex flex-col'>
              <TypographyH2>{quote.quote}</TypographyH2>
              <Body2>{quote.author}</Body2>
            </CardContent>
          </Card>
        ))}
      </Card>
    </Card>
  );
}
