'use client';

import QuoteForm from '@/components/QuoteForm';
import { addQuote } from '@/app/actions/quoteActions';

export default function NewQuotePage() {
  return (
    <QuoteForm
      action={addQuote}
      successMessage='Quote added successfully!'
      redirectTo='/'
    />
  );
}
