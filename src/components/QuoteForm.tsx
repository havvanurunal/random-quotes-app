'use client';

import { NewQuoteSchema } from '@/schemas/quotes';
import { NewQuoteFormState } from '@/types/forms';
import { NewQuoteInput } from '@/types/quotes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from './ui/spinner';
import { Field, FieldDescription, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const initialFormState: NewQuoteFormState = {
  success: false,
};

type QuoteFormProps = {
  action: (
    currentState: NewQuoteFormState,
    formData: FormData
  ) => Promise<NewQuoteFormState>;
  defaultValues?: {
    author: string;
    quote: string;
  };
  quoteId?: string;
  successMessage?: string;
  redirectTo?: string;
};

export default function QuoteForm({
  action,
  defaultValues,
  quoteId,
  successMessage = 'Quote saved successfully!',
  redirectTo = '/',
}: QuoteFormProps) {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(action, initialFormState);

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: defaultValues || { author: '', quote: '' },
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push(redirectTo);
      }, 2000);
    }
  }, [state.success]);

  const authorError =
    clientFormErrors?.author?.message || state.errors?.author?.[0];
  const quoteError =
    clientFormErrors?.quote?.message || state.errors?.quote?.[0];

  if (isPending) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <span>
          <Spinner data-icon='inline-start' /> Saving Quote...
        </span>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
        <h1 className='text-2xl font-bold mb-4'>{successMessage}</h1>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
      <form action={dispatchAction}>
        {quoteId && <input type='hidden' name='id' value={quoteId} />}
        <Field className='mb-3'>
          <FieldLabel htmlFor='author-input'>Author</FieldLabel>
          <Input
            id='author-input'
            type='text'
            placeholder='Evil Rabbit'
            aria-describedby='author-error'
            defaultValue={defaultValues?.author || state?.data?.author || ''}
            {...register('author')}
          />

          {authorError && (
            <FieldDescription id='author-error' variant='error'>
              {authorError}
            </FieldDescription>
          )}
        </Field>

        <Field className='mb-3'>
          <FieldLabel htmlFor='quote-text-area'>Quote</FieldLabel>
          <Textarea
            id='quote-text-area'
            placeholder='Add any quote you like'
            className='resize-none'
            aria-describedby='quote-error'
            defaultValue={defaultValues?.quote || state?.data?.quote || ''}
            {...register('quote')}
          />

          {quoteError && (
            <FieldDescription id='quote-error' variant='error'>
              {quoteError}
            </FieldDescription>
          )}
        </Field>

        <Field orientation='horizontal'>
          <Button variant='secondary' type='submit'>
            Save Quote
          </Button>
          <Button variant='secondary' type='reset'>
            Clear
          </Button>
        </Field>
      </form>
    </div>
  );
}
