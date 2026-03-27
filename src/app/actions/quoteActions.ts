'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import z from 'zod';
import { Quote } from '../quotes';

const NewQuoteSchema = z.object({
  author: z.string().trim().min(2, {message: 'Author name must be at least 2 characters!'}).max(50, {message: 'Author name must be max 50 characters!'}),
  quote: z.string().trim().min(2, {message: 'Quote must be at least 2 characters!'}).max(300, {message: 'Quote name must be max 300 characters!'})
});

export async function addQuote(currentState: NewQuoteFormState, formData: FormData): Promise<NewQuoteFormState> { // type of this function should be promise but we dont do any Promises here that's why added to return below.

  const rawData = {
    author: formData.get('author') as string ?? '',
    quote: formData.get('quote') as string ?? '',
  };

  
const result = NewQuoteSchema.safeParse(rawData);

if(!result.success) {
  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
    data: { ...rawData as Partial<Quote> },
    inputs: rawData
  }
}

  // data validation
  // store in DB (next lesson)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
    });
    }, 2000);
});
}