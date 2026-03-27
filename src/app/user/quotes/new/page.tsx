'use client';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addQuote } from '@/app/actions/quoteActions';
import { useEffect, useActionState } from 'react';
import { Quote } from '@/app/quotes';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

export type QuoteError = {
  author?: string[];
  quote?: string[];
};

export type NewQuoteFormState = {
  success: boolean;
  errors?: QuoteError;
  data?: Partial<Quote>; // Partial function only requires certain parts of quote.
  inputs?: {
    author: string;
    quote: string;
  };
};

const initialFormState: NewQuoteFormState = {
  success: false,
};

export default function NewQuotePage() {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(addQuote, initialFormState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [state.success]);

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
        <h1 className='text-2xl font-bold mb-4'>Quote added successfully!</h1>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto py-10 px-4 font-sans'>
      <form action={dispatchAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='author-input'>Author</FieldLabel>
            <Input
              id='author-input'
              name='author'
              type='text'
              placeholder='Evil Rabbit'
              maxLength={50}
              aria-describedby='author-error'
              required
              defaultValue={state.inputs?.author}
            />

            {state.errors?.author && (
              <FieldDescription id='author-error' variant='error'>
                {state.errors.author}
              </FieldDescription>
            )}
          </Field>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='quote-text-area'>Quote</FieldLabel>
                <Textarea
                  id='quote-text-area'
                  placeholder='Add any quote you like'
                  className='resize-none'
                  maxLength={300}
                  name='quote'
                  aria-describedby='quote-error'
                  required
                  defaultValue={state.inputs?.quote}
                />

                {state.errors?.quote && (
                  <FieldDescription id='quote-error' variant='error'>
                    {state.errors.quote}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation='horizontal'>
            <Button variant='secondary' type='submit'>
              Save Quote
            </Button>
            <Button variant='secondary' type='reset'>
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
