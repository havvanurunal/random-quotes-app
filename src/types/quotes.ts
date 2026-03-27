export type Quote = {
  quote: string;
  author: string;
  likeCount: number;
};

export type NewQuoteInput = Omit<Quote, 'likeCount'>;
