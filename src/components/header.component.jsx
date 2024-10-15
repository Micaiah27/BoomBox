/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useTheme } from '../utils/ThemeContext'; // Adjust the path as necessary

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header
      css={css`
        position: fixed;
        top: 0;
        z-index: 10;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background: ${isDarkMode
          ? 'linear-gradient(to bottom, #101212, #08201D)'
          : 'linear-gradient(to bottom, #F3F4F6, #FFFFFF)'};
        color: ${isDarkMode ? 'white' : '#333'};
      `}
    >
      
        <div>
          <img
            css={css`
              width: auto;
              height: 3rem;
              cursor: pointer;
            `}
            src="/logo.png"
            alt="BoomBox Logo"
            onClick={() => {
              window.location.href = '/';
            }}
          />
        </div>
      
      <button
        onClick={toggleDarkMode}
        css={css`
          background: transparent;
          cursor: pointer;
          margin-right: 3rem;
          margin-bottom:20px;
          border: none;
          outline: none;
          display: flex;
          align-items: center;
        `}
      >
        {isDarkMode ? (
          <SunIcon w={20} h={20} color="yellow" />
        ) : (
          <MoonIcon w={20} h={20} color="gray" />
        )}
      </button>
    </header>
  );
};



export default Header;
