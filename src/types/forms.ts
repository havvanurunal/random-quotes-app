import { NewQuoteInput } from "./quotes";

export type QuoteError = {
  author?: string[];
  quote?: string[];
};

export type ActionResult = {
  success: boolean;
  message?: string;
};

export type NewQuoteFormState = ActionResult & {
  errors?: QuoteError;
  data?: Partial<NewQuoteInput>;
};
