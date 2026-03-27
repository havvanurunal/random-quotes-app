'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { NewQuoteSchema } from '@/schemas/quotes';
import { Quote } from '@/types/quotes';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
  // type of this function should be promise but we dont do any Promises here that's why added to return below.

  const rawData = {
    author: (formData.get('author') as string) ?? '',
    quote: (formData.get('quote') as string) ?? '',
  };

  const result = NewQuoteSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: { ...(rawData as Partial<Quote>) },
    };
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
