import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

// User Registration
export const registerUser = async (email, password, name) => {
  const userId = ID.unique();

  try {
    // Register a user
    const response = await account.create(userId, email, password, name);
    // Automatically log the user in after registration
    await loginUser(email, password);
    return response; 
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error(error.message); 
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    await logoutUser()
    const session = await account.createEmailPasswordSession(email, password);
    // Store the session ID in localStorage
    localStorage.setItem('appwrite-session', session.$id);
    console.log('Logged in successfully!');
    
    return session; // Return the session object
  } catch (error) {
    console.error('Login failed:', error); // Log the error message
    console.error('Error details:', error.response); // Log the full error response if available
    throw new Error(error.message); // Rethrow the error for saga handling
  }
};



export const githubSignIn = async () => {
  try {
    const response = await account.createOAuth2Session(
      'github', 
      'http://localhost:5173',  // Success URL
      'http://localhost:3000'   // Failure URL
    );
    console.log('GitHub sign-in initiated successfully.');
    console.log('GitHub Signin response: ', response);
  } catch (error) {
    console.error('GitHub sign-in failed:', error);
  }
};

// User Logout
export const logoutUser = async () => {
  try {
      const sessionId = localStorage.getItem('appwrite-session');
      if (!sessionId) {
          console.log('No active session found, cannot log out.');
          return; 
      }
      await account.deleteSession('current'); 
      localStorage.removeItem('appwrite-session'); 
      console.log('Logged out successfully');
  } catch (error) {
      console.error('Logout failed', error);
  }
};
