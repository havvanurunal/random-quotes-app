import * as dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import { quotes } from '../src/app/quotes';

const MONGODB_URI = process.env.MONGO_CONNECTION_URL || '';

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('random-quotes');
    const col = db.collection('quotes');

    const docs = quotes.map((quote) => ({
      ...quote,
      likeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'seed',
    }));

    await col.insertMany(docs);
    console.log(`✅ Seeded ${docs.length} quotes successfully!`);
  } finally {
    await client.close();
  }
}

seed();
