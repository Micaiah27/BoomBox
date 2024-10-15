/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Image } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext'; // Adjust the path if necessary
import '../styles/globals.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Use the global theme context for dark mode

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <div
      css={css`
        background: ${isDarkMode
          ? 'linear-gradient(to top, #101212, #08201D)'
          : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
        color: ${isDarkMode ? 'white' : '#333'};
        font-family: 'Poppins', sans-serif;
        position: relative;
        min-height: 100vh;
      `}
    >
      <section
        css={css`
          padding: 50px 0;
          text-align: center;
          z-index: 20;
        `}
      >
        <h1
          css={css`
            font-size: 3rem;
            font-weight: bold;
            color: ${isDarkMode ? 'white' : '#333'};
          `}
        >
          Welcome to <span css={css`color: #FFD700;`}>BoomBox</span>!
        </h1>
        <Image
          css={css`
            margin: 0 auto 0px;
            max-width: 300px;
            height: auto;
          `}
          src="/logo.png"
          alt="Logo"
        />
        <h2
          css={css`
            font-size: 1.2rem;
            margin: 0px 300px 20px 300px;
            color: ${isDarkMode ? 'gray.300' : '#555'};
            line-height: 1.5;
          `}
        >
          BoomBox is an innovative web application that empowers users to
          create, update, delete, and access a diverse library of songs effortlessly.
        </h2>

        <Button
          className="button"
          css={css`
            background-color: ${isDarkMode ? '#D69E2E' : '#D69E2E'};
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;
            &:hover {
              background-color: ${isDarkMode ? '#B7791F' : '#B7791F'};
            }
          `}
          isLoading={false}
          colorScheme="blue"
          spinner={<BeatLoader size={8} color="white" />}
          onClick={handleGetStartedClick}
        >
          Get Started ➔
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
