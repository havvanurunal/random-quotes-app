'use client';

import { Quote } from '@/types/quotes';
import { updateQuoteAction } from '@/app/actions/quoteActions';
import QuoteForm from './QuoteForm';

type EditQuoteClientProps = {
  quote: Quote;
};

export default function EditQuoteClient({ quote }: EditQuoteClientProps) {
  return (
    <QuoteForm
      action={updateQuoteAction}
      defaultValues={{ author: quote.author, quote: quote.quote }}
      quoteId={quote._id}
      successMessage='Quote updated successfully!'
      redirectTo='/user/my-quotes'
    />
  );
}
