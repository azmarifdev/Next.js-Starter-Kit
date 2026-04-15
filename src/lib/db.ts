import { Db, MongoClient } from "mongodb";

import { env } from "@/lib/env";

const globalState = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoDb?: Db;
};

// Reuse a single MongoDB connection across requests in development.
export async function getDb(): Promise<Db | null> {
  if (!env.mongodbUri) {
    return null;
  }

  if (globalState.mongoDb) {
    return globalState.mongoDb;
  }

  const client = globalState.mongoClient ?? new MongoClient(env.mongodbUri);

  if (!globalState.mongoClient) {
    await client.connect();
    globalState.mongoClient = client;
  }

  const db = client.db(env.mongodbDbName);
  globalState.mongoDb = db;
  return db;
}
