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
import { NewQuoteInput } from '@/types/quotes';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewQuoteSchema } from '@/schemas/quotes';
import { useRouter } from 'next/navigation';

export type QuoteError = {
  author?: string[];
  quote?: string[];
};

export type NewQuoteFormState = {
  success: boolean;
  errors?: QuoteError;
  data?: Partial<NewQuoteInput>; // Partial function only requires certain parts of quote.
  message?: string;
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

  const {
    register,
    formState: { errors: clientFormErrors },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(NewQuoteSchema),
  });

  const authorError =
    clientFormErrors?.author?.message || state.errors?.author?.[0];
  const quoteError =
    clientFormErrors?.quote?.message || state.errors?.quote?.[0];

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
              type='text'
              placeholder='Evil Rabbit'
              aria-describedby='author-error'
              defaultValue={state?.data?.author || ''}
              {...register('author', {
                required: 'Author name is required',
                maxLength: {
                  value: 50,
                  message: 'Author name should be max 50 characters.',
                },
                minLength: {
                  value: 2,
                  message: 'Author name should be min 2 characters.',
                },
              })}
            />

            {authorError && (
              <FieldDescription id='author-error' variant='error'>
                {authorError}
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
                  aria-describedby='quote-error'
                  defaultValue={state?.data?.quote || ''}
                  {...register('quote', {
                    required: 'Quote input is required',
                    maxLength: {
                      value: 300,
                      message: 'Quote should be max 300 characters.',
                    },
                    minLength: {
                      value: 2,
                      message: 'Quote should be min 2 characters.',
                    },
                  })}
                />

                {quoteError && (
                  <FieldDescription id='quote-error' variant='error'>
                    {quoteError}
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
