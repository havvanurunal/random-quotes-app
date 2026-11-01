'use server';

import { ActionResult, NewQuoteFormState } from '@/types/forms';
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
import { revalidatePath } from 'next/cache';

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
    revalidatePath('/');
    revalidatePath('/user/my-quotes');
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred when saving the quote, try again later.',
      data: result.data,
    };
  }
}

export async function likeQuoteAction(quoteId: string): Promise<ActionResult> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const found = await likeQuote(quoteId, userId);
    if (!found) {
      return {
        success: false,
        message: 'Quote not found',
      };
    }
    revalidatePath('/');
    revalidatePath('/user/quotes');
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred when liking the quote, try again later.',
    };
  }
}

export async function unlikeQuoteAction(
  quoteId: string
): Promise<ActionResult> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const found = await unlikeQuote(quoteId, userId);
    if (!found) {
      return {
        success: false,
        message: 'Quote not found',
      };
    }
    revalidatePath('/');
    revalidatePath('/user/quotes');
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred when unliking the quote, try again later.',
    };
  }
}

export async function deleteQuoteAction(
  quoteId: string
): Promise<ActionResult> {
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const found = await deleteQuote(quoteId, userId);
    if (!found) {
      return {
        success: false,
        message: 'Quote not found',
      };
    }
    revalidatePath('/');
    revalidatePath('/user/my-quotes');
    revalidatePath('/user/quotes');
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred when deleting the quote, try again later.',
    };
  }
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
  try {
    const found = await updateQuote(quoteId, userId, result.data);
    if (!found) {
      return {
        success: false,
        message: 'Quote not found',
        data: result.data,
      };
    }
    revalidatePath('/');
    revalidatePath('/user/my-quotes');
    revalidatePath('/user/quotes');
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred when saving the quote, try again later.',
      data: result.data,
    };
  }
}
