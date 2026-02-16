'use client';
//it makes the component client side component, 
import { useState, useEffect } from 'react';
import { Subtitle } from '@/components/Subtitle';
import { Body2 } from '@/components/Body2';
import {
  useQuotesContext,
  useQuotesDispatchContext,
} from '@/app/QuotesContext';


export default function UserQuotes() {
  const { quotes } = useQuotesContext();
  const { handleUnlike } = useQuotesDispatchContext();

  const likedQuotes = quotes.filter((quote) => quote.likeCount > 0);

  return (
    <main className='min-h-dvh text-center'>
      <h1 className='text-4xl font-bold my-12'>Liked Quotes</h1>
      {likedQuotes.length > 0 && likedQuotes.map((quote) => (
        <div key={quote.quote} className='flex flex-col w-md my-6 mx-auto bg-slate-400 p-10 rounded-md'>
          <button onClick={() => handleUnlike(quote)} className='self-end hover:cursor-pointer text-2xl'>❤️</button>
          <div>
            <Subtitle title={quote.quote} />
            <Body2>{quote.author}</Body2>
          </div>
        </div>
      ))}
    </main>
  );
}
// two different ways to pass values to components => Subtitle and Body2. Subtitle one is a standard prop, it's better when you want to pass multiple configurations. with Body2, we used different approach, we used children, instead of a specific value prop. for children, we must use it in opening and closing tags. 