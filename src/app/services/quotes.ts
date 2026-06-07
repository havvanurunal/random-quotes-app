import { NewQuoteInput, Quote } from '@/types/quotes';
import { Collections, getDb } from '../lib/mongo';
import { ObjectId } from 'mongodb';

function mapQuote(doc: any): Quote {
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
  return db.collection(Collections.quotes);
}

export async function createQuote(
  quote: NewQuoteInput,
  userId: string
): Promise<Quote> {
  const col = await getQuotesCollection();

  const now = new Date();

  const doc = {
    likedBy: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    userId,
    ...quote,
  };

  const newQuote = await col.insertOne(doc);

  return mapQuote({ ...doc, _id: newQuote.insertedId.toString() });
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
  userId: string
): Promise<void> {
  const col = await getQuotesCollection();

  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $push: { likedBy: userId } }
  );
}

export async function unlikeQuote(
  quoteId: string,
  userId: string
): Promise<void> {
  const col = await getQuotesCollection();

  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $pull: { likedBy: userId } }
  );
}

export async function deleteQuote(
  quoteId: string,
  userId: string
): Promise<void> {
  const col = await getQuotesCollection();

  await col.deleteOne({ _id: new ObjectId(quoteId), userId });
}

export async function updateQuote(
  quoteId: string,
  userId: string,
  data: NewQuoteInput
): Promise<void> {
  const col = await getQuotesCollection();

  await col.updateOne(
    { _id: new ObjectId(quoteId), userId },
    { $set: { ...data, updatedAt: new Date().toISOString() } }
  );
}
