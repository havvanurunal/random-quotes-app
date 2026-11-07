export type Quote = {
  _id?: string;
  quote: string;
  author: string;
  likedBy: string[];
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewQuoteInput = {
  quote: string;
  author: string;
};
