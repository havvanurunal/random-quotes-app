import { NewQuoteInput, Quote } from '@/types/quotes';
import { Collections, getDb } from '../lib/mongo';
import { auth0 } from '@/lib/auth0';
import { ObjectId } from 'mongodb';

export async function createQuote(quote: NewQuoteInput): Promise<Quote> {
  const session = await auth0.getSession();
  const user = session?.user;

  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const now = new Date();

  const doc = {
    likeCount: 0,
    createdAt: now,
    updatedAt: now,
    userId: user.sub,
    ...quote,
  };

  const newQuote = await col.insertOne(doc);

  return {
    _id: newQuote.insertedId.toString(),
    quote: doc.quote,
    author: doc.author,
    likeCount: doc.likeCount,
  };
}

export async function getQuotes(): Promise<Quote[]> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const quotes = await col.find({}).toArray();

  return quotes.map((doc) => ({
    _id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    likeCount: doc.likeCount,
    userId: doc.userId,
  }));
}

export async function getMyQuotes(userId: string): Promise<Quote[]> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const quotes = await col.find({ userId }).toArray();

  return quotes.map((doc) => ({
    _id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    likeCount: doc.likeCount,
    userId: doc.userId,
  }));
}

export async function getQuoteById(quoteId: string): Promise<Quote | null> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const doc = await col.findOne({ _id: new ObjectId(quoteId) });

  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    likeCount: doc.likeCount,
    userId: doc.userId,
  };
}

export async function getLikedQuotes(): Promise<Quote[]> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const quotes = await col.find({ likeCount: { $gt: 0 } }).toArray();

  return quotes.map((doc) => ({
    _id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    likeCount: doc.likeCount,
    userId: doc.userId,
  }));
}

export async function likeQuote(quoteId: string): Promise<void> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $inc: { likeCount: 1 } }
  );
}

export async function unlikeQuote(quoteId: string): Promise<void> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $inc: { likeCount: -1 } }
  );
}

export async function deleteQuote(quoteId: string): Promise<void> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  await col.deleteOne({ _id: new ObjectId(quoteId) });
}

export async function updateQuote(
  quoteId: string,
  data: NewQuoteInput
): Promise<void> {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  await col.updateOne(
    { _id: new ObjectId(quoteId) },
    { $set: { ...data, updatedAt: new Date() } }
  );
}
