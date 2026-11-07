import { NewQuoteInput, Quote } from "@/types/quotes";
import { Collections, getDb } from "../lib/mongo";
import { ObjectId, WithId } from "mongodb";

type QuoteDocument = NewQuoteInput & {
  likedBy: string[];
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

function mapQuote(doc: WithId<QuoteDocument>): Quote {
  return {
    _id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    likedBy: doc.likedBy,
    userId: doc.userId,
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : doc.createdAt,
    updatedAt:
      doc.updatedAt instanceof Date
        ? doc.updatedAt.toISOString()
        : doc.updatedAt,
  };
}

async function getQuotesCollection() {
  const db = await getDb();
  return db.collection<QuoteDocument>(Collections.quotes);
}

export async function createQuote(
  quote: NewQuoteInput,
  userId: string,
): Promise<Quote> {
  const col = await getQuotesCollection();

  const now = new Date();

  const doc: Omit<QuoteDocument, "_id"> = {
    likedBy: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    userId,
    ...quote,
  };

  const newQuote = await col.insertOne(doc);

  return mapQuote({ ...doc, _id: newQuote.insertedId });
}

export async function getQuotes(): Promise<Quote[]> {
  const col = await getQuotesCollection();
  const quotes = await col.find({}).toArray();

  return quotes.map(mapQuote);
}

export async function getMyQuotes(userId: string): Promise<Quote[]> {
  const col = await getQuotesCollection();
  const quotes = await col.find({ userId }).toArray();

  return quotes.map(mapQuote);
}

export async function getQuoteById(quoteId: string): Promise<Quote | null> {
  const col = await getQuotesCollection();
  const doc = await col.findOne({ _id: new ObjectId(quoteId) });

  if (!doc) return null;
  return mapQuote(doc);
}

export async function getLikedQuotes(userId: string): Promise<Quote[]> {
  const col = await getQuotesCollection();
  const quotes = await col.find({ likedBy: userId }).toArray();
  return quotes.map(mapQuote);
}

export async function likeQuote(
  quoteId: string,
  userId: string,
): Promise<boolean> {
  const col = await getQuotesCollection();

  const result = await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $addToSet: { likedBy: userId } },
  );

  return result.matchedCount > 0;
}

export async function unlikeQuote(
  quoteId: string,
  userId: string,
): Promise<boolean> {
  const col = await getQuotesCollection();

  const result = await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $pull: { likedBy: userId } },
  );

  return result.matchedCount > 0;
}

export async function deleteQuote(
  quoteId: string,
  userId: string,
): Promise<boolean> {
  const col = await getQuotesCollection();

  const result = await col.deleteOne({ _id: new ObjectId(quoteId), userId });

  return result.deletedCount > 0;
}

export async function updateQuote(
  quoteId: string,
  userId: string,
  data: NewQuoteInput,
): Promise<boolean> {
  const col = await getQuotesCollection();

  const result = await col.updateOne(
    { _id: new ObjectId(quoteId), userId },
    { $set: { ...data, updatedAt: new Date().toISOString() } },
  );

  return result.matchedCount > 0;
}
