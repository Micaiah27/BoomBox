// src/api/songApi.js
import { databases } from '../appwrite';  // Import initialized Appwrite SDK

const databaseId = '66f3addb002360835db0';
const collectionId = '66f3ae1d0028192f5259';

export const fetchSongsApi = async () => {
  const response = await databases.listDocuments(databaseId, collectionId);
  return response.documents;
};

export const createSongApi = async (songData) => {
  const response = await databases.createDocument(databaseId, collectionId, 'unique()', songData);
  return response;
};

export const updateSongApi = async (id, updatedData) => {
  const response = await databases.updateDocument(databaseId, collectionId, id, updatedData);
  return response;
};

export const deleteSongApi = async (id) => {
  const response = await databases.deleteDocument(databaseId, collectionId, id);
  return response;
};
