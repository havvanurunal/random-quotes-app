import { NewQuoteInput } from './quotes';

export type QuoteError = {
  author?: string[];
  quote?: string[];
};

export type NewQuoteFormState = {
  success: boolean;
  errors?: QuoteError;
  data?: Partial<NewQuoteInput>;
  message?: string;
};
