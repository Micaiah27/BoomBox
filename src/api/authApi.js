// frontend/src/api/authApi.js
import { account, createSessionClient } from '../appwrite';

// User Registration
export const registerUser = async (email, password, name) => {
  return await account.create('unique()', email, password, name);
};

// User Login
export const loginUser = async (email, password) => {
  try {
    console.log(email, password)
    const session = await account.createSession(email, password);
    // Store the session token (JWT) in sessionStorage
    localStorage.setItem('appwrite-session', session.$id);
    console.log(session.$id) // $id contains the session token
    console.log('Logged in successfully!');
  } catch (error) {
    console.error('Login failed', error);
  }
};

export const githubSignIn = async () => {
  const url = await account.createOAuth2URL('github', 'http://localhost:5173','http://localhost:3000'); // Redirect URL
  window.location.href = url; // Redirect to GitHub sign-in
};
// User Logout
export const logoutUser = async () => {
  try {
    // Invalidate the session in Appwrite
    await account.deleteSession('current'); // 'current' deletes the current logged-in session
    // Clear the session from sessionStorage
    sessionStorage.removeItem('appwrite-session');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout failed', error);
};
}

export async function getLoggedInUser() {
  try {
      const { account } = await createSessionClient();
      const user = await account.get();

      return JSON.parse(JSON.stringify(user))
  } catch (error) {
      return console.error(error)
  }
}