'use client';

import { Quote } from '@/types/quotes';
import { updateQuoteAction } from '@/app/actions/quoteActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewQuoteSchema } from '@/schemas/quotes';
import { useForm } from 'react-hook-form';
import { useActionState } from 'react';
import { NewQuoteInput } from '@/types/quotes';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type EditQuoteClientProps = {
  quote: Quote;
};

export type NewQuoteFormState = {
  success: boolean;
  errors?: any;
  data?: Partial<NewQuoteInput>; // Partial function only requires certain parts of quote.
  message?: string;
};

const initialFormState: NewQuoteFormState = {
  success: false,
};

export default function EditQuoteClient({ quote }: EditQuoteClientProps) {
  const [state, dispatchAction, isPending] = useActionState<
    NewQuoteFormState,
    FormData
  >(updateQuoteAction, initialFormState);

  const {
    register,
    formState: { errors: clientFormErrors, isValid: isFormValid },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(NewQuoteSchema),
    defaultValues: {
      author: quote.author,
      quote: quote.quote,
    },
  });
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
      </div>
    );
  }

  return (
    <div className='w-full max-w-2xl mx-auto py-10 px-4 font-sans'>
      <form action={dispatchAction}>
        <input type='hidden' name='id' value={quote._id} />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='author-input'>Author</FieldLabel>
            <Input
              id='author-input'
              type='text'
              placeholder='Evil Rabbit'
              aria-describedby='author-error'
              defaultValue={quote.author}
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

            {state.errors?.author && (
              <FieldDescription id='author-error'>
                {state.errors?.author?.join(':')}
              </FieldDescription>
            )}

            {clientFormErrors?.author && (
              <FieldDescription id='author-error'>
                {clientFormErrors?.author?.message}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor='quote-text-area'>Quote</FieldLabel>
            <Textarea
              id='quote-text-area'
              placeholder='Add any quote you like'
              className='resize-none'
              aria-describedby='quote-error'
              defaultValue={quote.quote}
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
            {state.errors?.quote && (
              <FieldDescription id='quote-error'>
                {state.errors?.quote?.join(':')}
              </FieldDescription>
            )}

            {clientFormErrors?.quote && (
              <FieldDescription id='quote-error'>
                {clientFormErrors?.quote?.message}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>

        <Field orientation='horizontal' className='py-4'>
          <Button type='submit' disabled={!isFormValid}>
            Save Quote
          </Button>
          <Button variant='outline' type='reset'>
            Clear
          </Button>
        </Field>
      </form>
    </div>
  );
}
