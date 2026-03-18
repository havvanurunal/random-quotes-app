'use client';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/h2';
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from '@/app/QuotesContext';

export default function Home() {
  const { quotes, currentIndex } = useQuotesContext();
  const { handleNextQuoteClick, handleLike } = useQuotesDispatchContext();

  function handleLikeClick() {
    handleLike(quotes[currentIndex]);
  }

  return (
    <Card className='max-w-md w-full p-10 bg-slate-400'>
      <CardHeader className='flex items-center justify-end'>
        <Button
          variant='ghost'
          size='icon'
          className='text-2xl hover:bg-slate-400'
          onClick={handleLikeClick}
        >
          ❤️
        </Button>
        <span className=' text-lg justify-end font-sans'>
          {quotes[currentIndex].likeCount}
        </span>
      </CardHeader>
      <TypographyH2>{quotes[currentIndex].quote}</TypographyH2>
      <Body2>{quotes[currentIndex].author}</Body2>
      <Button
        variant='outline'
        className='bg-slate-600 text-amber-50'
        onClick={handleNextQuoteClick}
      >
        Next Quote
      </Button>
    </Card>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags.
