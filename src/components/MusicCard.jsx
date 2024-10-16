/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaEllipsisV } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../utils/ThemeContext';

const MusicCard = ({ type = 'all',imgSrc, title, artist, album, genre,  onEdit, onDelete }) => {
  const { isDarkMode } = useTheme(); 
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showOptions ? 'hidden' : 'auto';
  }, [showOptions]);

  return (
    <div css={cardStyles(isDarkMode)}>
      <div css={imageContainer}>
        <img src={imgSrc} alt={title} css={imageStyles} />
        <button css={optionsButton(isDarkMode)} onClick={() => setShowOptions(prev => !prev)}>
          <FaEllipsisV />
        </button>
        {showOptions && (
          <div css={optionsMenu(isDarkMode)} ref={optionsRef}>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
      {type = 'all' && <div css={contentStyles(isDarkMode)}>
        <h3>{title} </h3>
        <p>{artist}</p>
        <p>{genre}</p>
      </div>}
    </div>
  );
};

// Emotion CSS Styles
const cardStyles = (isDarkMode) => css`
  width: 200px;
  border: 1px solid ${isDarkMode ? '#4A5568' : '#e2e8f0'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${isDarkMode ? '#2D3748' : 'white'};
  margin: 20px;
  height:240px;
  transition: transform 0.2s; /* Smooth scaling transition */

  &:hover {
    transform: scale(1.05); /* Scale up the image on hover */
  }
`;

const imageContainer = css`
  position: relative;
`;

const imageStyles = css`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const optionsButton = (isDarkMode) => css`
  position: absolute;
  top: 10px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${isDarkMode ? '#F7FAFC' : 'black'};
  font-size: 16px;
`;

const optionsMenu = (isDarkMode) => css`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: ${isDarkMode ? '#2D3748' : 'white'};
  border: 1px solid ${isDarkMode ? '#4A5568' : '#e2e8f0'};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  button {
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    color: ${isDarkMode ? '#F7FAFC' : 'black'};

    &:hover {
      background-color: ${isDarkMode ? '#4A5568' : '#f1f5f9'};
    }
  }
`;

const contentStyles = (isDarkMode) => css`
  padding-left: 10px;
  color: ${isDarkMode ? '#F7FAFC' : '#4A5568'};
  margin: 0;
  padding-bottom: 10px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: ${isDarkMode ? '#E2E8F0' : '#4A5568'};
    padding: 0;
    margin: 0;
  }
`;

// Prop types validation
MusicCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  genre: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default MusicCard;
