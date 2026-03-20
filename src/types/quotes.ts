export type Quote = {
  quote: string;
  author: string;
  likeCount: number;
};

export interface NewQuoteInput {
  quote: string;
  author: string;
}
