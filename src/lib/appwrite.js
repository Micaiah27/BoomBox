// src/appwrite.js
import { Client, Databases, Account } from 'appwrite';

const db_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

// Function to initialize Appwrite client with existing session JWT
export async function createSessionClient() {
  const session = localStorage.getItem("appwrite-session");

  if (!session) {
    throw new Error("No session found, user is not logged in");
  }

  client.setJWT(session); // Attach session JWT to the client

  return {
    account: new Account(client), // Return authenticated account instance
    databases: new Databases(client), // Return database instance
  };
}

export { client, databases, account, db_id, collection_id };
