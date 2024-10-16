# BoomBox 🎶

BoomBox is a full-stack music management application that allows users to create, view, update, and delete songs from their personal collection. It provides user authentication, supports GitHub login via Appwrite, and offers a responsive UI with dark/light mode switching.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🎵 **CRUD Operations**: Add, view, edit, and delete songs.
- 📝 **User Authentication**: Sign up, sign in, and GitHub OAuth integration via Appwrite.
- 🌗 **Dark/Light Mode**: Toggle between dark and light themes.
- 📱 **Responsive Design**: Optimized for both mobile and desktop views.
- 🎤 **Music Categorization**: Sort music by artists, albums, and genres.
- 📂 **Music Management Dashboard**: A dashboard to manage your song collection.

---

## Tech Stack

### Frontend:
- **React.js**: Core UI library.
- **Redux Toolkit**: State management.
- **Redux-Saga**: Side effects handling.
- **Emotion**: CSS-in-JS styling.
- **Chakra UI**: For icons and theme switching.
- **React Router**: Routing between pages.
- **React Icons**: For various icons used across the application.

### Backend:
- **Appwrite**: Handles authentication, database management (no custom backend is implemented).

### Tools:
- **Vercel**: Deployed on Vercel for easy hosting.

---

## Installation

### Prerequisites:
- **Node.js** (version >= 14.x.x)
- **npm** or **yarn** installed globally.

### Steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/boombox.git
    ```

2. Navigate to the project folder:
    ```bash
    cd boombox
    ```

3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4. Create an `.env` file in the root of your project and add the necessary Appwrite configuration keys:
    ```
    REACT_APP_APPWRITE_ENDPOINT=your-appwrite-endpoint
    REACT_APP_APPWRITE_PROJECT_ID=your-appwrite-project-id
    ```

5. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

6. Access the app at `http://localhost:yourportnumber`.

---

## Usage

- **Homepage**: Explore the list of songs and view details.
- **Authentication**: Use the signup or login page to create an account or log in.
- **Dashboard**: After logging in, manage your songs by adding new ones or editing existing entries.
- **Music Management**: Filter songs by artist, album, or genre using the sidebar.
- **Dark/Light Mode**: Toggle between dark and light mode using the header button.

---


## Contributing

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit:
    ```bash
    git commit -m "Add a short description of the feature"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

---


## Contact

Feel free to reach out if you have any questions or suggestions!
