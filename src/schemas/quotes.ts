import z from 'zod';

export const NewQuoteSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: 'Author name must be at least 2 characters!' })
    .max(50, { message: 'Author name must be max 50 characters!' }),
  quote: z
    .string()
    .trim()
    .min(2, { message: 'Quote must be at least 2 characters!' })
    .max(300, { message: 'Quote name must be max 300 characters!' }),
});
