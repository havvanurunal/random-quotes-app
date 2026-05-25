'use client';
import { useState } from 'react';
import { Quote } from '@/types/quotes';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/h2';
import { unlikeQuoteAction } from '@/app/actions/quoteActions';

type LikedQuotesClientProps = {
  quotes: Quote[];
};

export default function LikedQuotesClient({ quotes }: LikedQuotesClientProps) {
  const [likedQuotes, setLikedQuotes] = useState(
    quotes.filter((quote) => quote.likeCount > 0)
  );

  async function handleUnlike(quote: Quote) {
    await unlikeQuoteAction(quote._id);
    setLikedQuotes((prev) =>
      prev
        .map((q) =>
          q._id === quote._id ? { ...q, likeCount: q.likeCount - 1 } : q
        )
        .filter((q) => q.likeCount > 0)
    );
  }

  return (
    <Card className='max-w-md w-full ring-0'>
      <CardTitle className='text-3xl font-bold font-sans text-center mb-6 mt-5'>
        Liked Quotes
      </CardTitle>

      {likedQuotes.map((quote) => (
        <Card
          key={quote._id}
          className='flex flex-col w-full max-w-md my-6 mx-auto bg-slate-400 py-15 px-5 rounded-md'
        >
          <CardHeader className='flex items-center justify-end'>
            <Button
              size='icon'
              variant='ghost'
              className='text-2xl hover:bg-slate-400'
              onClick={() => handleUnlike(quote)}
              aria-label='Unlike quote'
            >
              ❤️
            </Button>
            <span className='text-xl justify-end font-sans'>
              {quote.likeCount}
            </span>
          </CardHeader>
          <CardContent className='flex flex-col'>
            <TypographyH2>{quote.quote}</TypographyH2>
            <Body2>{quote.author}</Body2>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}
