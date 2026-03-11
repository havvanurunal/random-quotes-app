'use client';
//it makes the component client side component,
import { Subtitle } from '@/components/Subtitle';
import { Body2 } from '@/components/Body2';
import { Button } from '@/components/ui/button';
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
      <Card className='max-w-md w-full ring-0'>
        <CardTitle className='text-3xl font-bold text-center mb-6 mt-5'>
          Liked Quotes
        </CardTitle>

        {likedQuotes.length > 0 &&
          likedQuotes.map((quote) => (
            <Card
              key={quote.quote}
              className='flex flex-col w-full max-w-md my-6 mx-auto bg-slate-400 p-10 rounded-md'
            >
              <CardHeader className='flex items-center justify-end'>
                <Button
                  size='icon'
                  variant='ghost'
                  className='text-xl hover:bg-slate-400'
                  onClick={() => handleUnlike(quote)}
                >
                  ❤️
                </Button>
                <span className='text-xl justify-end'>{quote.likeCount}</span>
              </CardHeader>
              <CardContent className='flex flex-col'>
                <Subtitle title={quote.quote} />
                <Body2>{quote.author}</Body2>
              </CardContent>
            </Card>
          ))}
      </Card>
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags.
