// src/appwrite.js
import { Client, Databases, Account } from 'appwrite';


const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
   

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };

export async function createSessionClient() {
  const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  // Get session token from localStorage or sessionStorage
  const session = localStorage.getItem("appwrite-session"); // or use sessionStorage

  if (!session) {
    throw new Error("No session");
  }

  client.setJWT(session); // Set session token

  return {
    account: new Account(client), // Return account instance
  };
}

