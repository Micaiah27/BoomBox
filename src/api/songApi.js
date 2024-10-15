import { Query } from 'appwrite';
import { databases, db_id, collection_id } from '../lib/appwrite';

// Fetch songs specific to the logged-in user
export const fetchSongsApi = async (userId) => {
  const response = await databases.listDocuments(
    db_id, 
    collection_id,
    [Query.equal('userId', userId)] 
  );
  return response.documents;
};

// Create a new song
export const createSongApi = async (song) => {
  const response = await databases.createDocument(
    db_id,
    collection_id,
    'unique()', 
    song
  );
  
  return response;
};

// Update a song
export const updateSongApi = async (data) => {
  
    const { songId, ...updatedSong } = data;
    const response = await databases.updateDocument(
      db_id,
      collection_id,
      songId,
      updatedSong
    );
    return response;
   
}


// Delete a song
export const deleteSongApi = async (id) => {
  const response = await databases.deleteDocument(
    db_id,
    collection_id,
    id
  );
  
  return response;
};
