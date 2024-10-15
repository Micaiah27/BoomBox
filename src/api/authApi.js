import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

// User Registration
export const registerUser = async (email, password, name) => {
  const userId = ID.unique();

  try {
    // Register the user
    const response = await account.create(userId, email, password, name);
    //console.log('Registration successful:', response);

    // Automatically log the user in after registration
    const session = await loginUser(email, password);
    //console.log('Logged in successfully:', session);
    
    return response; // You can return the response or session as needed
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error(error.message); // Rethrow the error for handling
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    //console.log("Logging in with:", { email, password });
    await logoutUser()
    // Create a new session with the provided email and password
    const session = await account.createEmailPasswordSession(email, password);
    //console.log('Session:', session);
    
    // Store the session ID in localStorage
    localStorage.setItem('appwrite-session', session.$id);
    //console.log('Session ID:', session.$id); // For debugging
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
    // Use createOAuth2Session instead of createOAuth2URL
    await account.createOAuth2Session(
      'github', 
      'http://localhost:5173',  // Success URL
      'http://localhost:3000'   // Failure URL
    );
    console.log('GitHub sign-in initiated successfully.');
  } catch (error) {
    console.error('GitHub sign-in failed:', error);
  }
};

// User Logout
// User Logout
export const logoutUser = async () => {
  try {
      const sessionId = localStorage.getItem('appwrite-session');
      if (!sessionId) {
          console.log('No active session found, cannot log out.');
          return; // Simply return instead of throwing an error
      }

      // Invalidate the session in Appwrite
      await account.deleteSession('current'); // Deletes the current logged-in session
      localStorage.removeItem('appwrite-session'); // Clear session from storage
      console.log('Logged out successfully');
  } catch (error) {
      console.error('Logout failed', error);
  }
};


// Get Logged-in User
export const getLoggedInUser = async () => {
  try {
    const user = await account.get(); // Fetch the logged-in user details
    //console.log('user: ', user)
    return user;
  } catch (error) {
    console.error('Failed to fetch user data', error);
    return null; // Return null if no user is logged in
  }
};
