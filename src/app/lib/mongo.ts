import { MongoClient, ServerApiVersion } from "mongodb";

let promise: Promise<MongoClient> | null = null;

async function getMongoClient() {
  const uri = process.env.MONGO_CONNECTION_URL;
  if (!uri) {
    throw new Error("MONGO_CONNECTION_URL is not set");
  }
  if (!promise) {
    promise = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    }).connect();
  }
  const client = await promise;
  return client;
}

export async function getDb() {
  const connection = await getMongoClient();
  return connection.db("random-quotes");
}

export enum Collections {
  quotes = "quotes",
}
