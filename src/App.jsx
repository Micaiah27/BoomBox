/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './utils/ThemeContext';
import { css, Global } from '@emotion/react';
import Footer from './components/footer.component';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import Header from './components/header.component';
import Dashboard from './pages/Dashboard';
import PrivateRoutes from './utils/privateRoutes';
;

const App = () => {
  return (
    <ThemeProvider> {/* Wrapping the whole app with ThemeProvider */}
      
        <Router> {/* Router should wrap the routes */}
          <Header />
          <Global
            styles={css`
              body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              }
            `}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
        <Footer />
      
    </ThemeProvider>
  );
};

export default App;
