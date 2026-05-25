export type Quote = {
  _id?: string;
  quote: string;
  author: string;
  likeCount: number;
  userId?: string;
};

export type NewQuoteInput = Omit<Quote, 'likeCount'>;
