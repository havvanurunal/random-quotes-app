'use client';
//it makes the component client side component,
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/h2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from '@/app/QuotesContext';

export default function UserQuotes() {
  const { quotes } = useQuotesContext();
  const { handleUnlike } = useQuotesDispatchContext();

  const likedQuotes = quotes.filter((quote) => quote.likeCount > 0);

  return (
    <main className='min-h-dvh flex justify-center px-4'>
      <Card className='max-w-md w-full ring-0 bg-color-none'>
        <CardTitle className='text-3xl font-bold font-sans text-center mb-6 mt-5'>
          Liked Quotes
        </CardTitle>

        {likedQuotes.length > 0 &&
          likedQuotes.map((quote) => (
            <Card
              key={quote.quote}
              className='flex flex-col w-full max-w-md my-6 mx-auto bg-slate-400 py-15 px-5 rounded-md'
            >
              <CardHeader className='flex items-center justify-end'>
                <Button
                  size='icon'
                  variant='ghost'
                  className='text-2xl hover:bg-slate-400'
                  onClick={() => handleUnlike(quote)}
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
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags.
