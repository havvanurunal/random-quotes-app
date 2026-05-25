'use server';

import { NewQuoteFormState } from '@/types/forms';
import { NewQuoteSchema } from '@/schemas/quotes';
import { Quote } from '@/types/quotes';
import {
  createQuote,
  deleteQuote,
  likeQuote,
  unlikeQuote,
  updateQuote,
} from '@/app/services/quotes';
import { auth0 } from '@/lib/auth0';

export async function addQuote(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();
  const userId = session?.user.sub;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

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
    await createQuote(result.data, userId);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occured when saving the quote, try again later.',
      data: result.data,
    };
  }
}

export async function likeQuoteAction(quoteId: string): Promise<void> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await likeQuote(quoteId, userId);
}

export async function unlikeQuoteAction(quoteId: string): Promise<void> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await unlikeQuote(quoteId, userId);
}

export async function deleteQuoteAction(quoteId: string): Promise<void> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    throw new Error('Unauthorized');
  }
  await deleteQuote(quoteId, userId);
}

export async function updateQuoteAction(
  currentState: NewQuoteFormState,
  formData: FormData
): Promise<NewQuoteFormState> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  const quoteId = formData.get('id') as string;
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

  await updateQuote(quoteId, userId, result.data);
  return { success: true };
}
