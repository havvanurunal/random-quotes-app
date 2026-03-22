export type Quote = {
  _id?: string;
  quote: string;
  author: string;
  likeCount: number;
  userId?: string;
};

export interface NewQuoteInput {
  quote: string;
  author: string;
}
