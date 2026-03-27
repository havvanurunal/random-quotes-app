'use client';
import { useEffect, useState } from 'react';
import { Quote } from '@/types/quotes';
import { likeQuoteAction } from '@/app/actions/quoteActions';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/h2';

type HomeClientProps = {
  quotes: Quote[];
};

export default function HomeClient({ quotes }: HomeClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  const [likeCount, setLikeCount] = useState(
    quotes[currentIndex]?.likeCount ?? 0
  );

  function handleNextQuoteClick() {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(nextIndex);
    setLikeCount(quotes[nextIndex]?.likeCount ?? 0);
  }

  async function handleLikeClick() {
    setLikeCount((prev) => prev + 1);
    await likeQuoteAction(quotes[currentIndex]._id);
  }

  return (
    <Card className='max-w-md w-full p-10 bg-slate-400'>
      <CardHeader className='flex items-center justify-end'>
        <Button
          variant='ghost'
          size='icon'
          className='text-2xl hover:bg-slate-400'
          onClick={handleLikeClick}
          aria-label='Like quote'
        >
          ❤️
        </Button>
        <span className=' text-lg justify-end font-sans'>{likeCount}</span>
      </CardHeader>
      <TypographyH2>{quotes[currentIndex]?.quote}</TypographyH2>
      <Body2>{quotes[currentIndex]?.author}</Body2>
      <Button
        variant='outline'
        className='bg-slate-600 text-amber-50'
        onClick={handleNextQuoteClick}
        aria-label='See next quote'
      >
        Next Quote
      </Button>
    </Card>
  );
}
