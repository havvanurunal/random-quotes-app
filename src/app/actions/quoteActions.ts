'use server';

import { NewQuoteFormState } from '@/app/user/quotes/new/page';
import { NewQuoteSchema } from '@/schemas/quotes';
import { Quote } from '@/types/quotes';
import {
  createQuote,
  deleteQuote,
  likeQuote,
  unlikeQuote,
  updateQuote,
} from '@/app/services/quotes';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
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

  try {
    await createQuote(result.data);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('An error occured when saving a new to database');
    return {
      success: false,
      message: 'An error occured when saving the quote, try again later.',
      data: result.data,
    };
  }
}

export async function likeQuoteAction(quoteId: string): Promise<void> {
  await likeQuote(quoteId);
}

export async function unlikeQuoteAction(quoteId: string): Promise<void> {
  await unlikeQuote(quoteId);
}

export async function deleteQuoteAction(quoteId: string): Promise<void> {
  await deleteQuote(quoteId);
}

export async function updateQuoteAction(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
  const quoteId = formData.get('id') as string;
  const rawData = {
    author: (formData.get('author') as string) ?? '',
    quote: (formData.get('quote') as string) ?? '',
  };
  await updateQuote(quoteId, rawData);
  return { success: true };
}
