/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; 

const AddMusicPopup = ({ onClose, onAddMusic, isDarkMode, type, musicData }) => {
  const titleRef = useRef(null);
  const artistRef = useRef(null);
  const albumRef = useRef(null);
  const genreRef = useRef(null);
  const imageUrlRef = useRef(null); 

  // Effect to populate fields if editing
  useEffect(() => {
    if (type === 'edit' && musicData) {
      titleRef.current.value = musicData.title;
      artistRef.current.value = musicData.artist;
      albumRef.current.value = musicData.album;
      genreRef.current.value = musicData.genre;
      imageUrlRef.current.value = musicData.image; 
    }
  }, [type, musicData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMusic = {
      title: titleRef.current.value,
      artist: artistRef.current.value,
      album: albumRef.current.value,
      genre: genreRef.current.value,
      Image: imageUrlRef.current.value, 
    };
    onAddMusic(newMusic, type); 
    onClose();
  };

  return (
    <div css={popupOverlayStyles} onClick={onClose}>
      <div css={popupStyles(isDarkMode)} onClick={(e) => e.stopPropagation()}>
        <button css={closeButtonStyles} onClick={onClose}>
          <FaTimes />
        </button>
        <form onSubmit={handleSubmit}>
          <h3>{type === 'edit' ? 'Update Music' : 'Add New Music'}</h3>
          <input type="text" placeholder="Image URL" ref={imageUrlRef} required css={inputStyles(isDarkMode)} />
          <input type="text" placeholder="Title" ref={titleRef} required css={inputStyles(isDarkMode)} />
          <input type="text" placeholder="Artist" ref={artistRef} required css={inputStyles(isDarkMode)} />
          <input type="text" placeholder="Album" ref={albumRef} required css={inputStyles(isDarkMode)} />
          <input type="text" placeholder="Genre" ref={genreRef} required css={inputStyles(isDarkMode)} />
          <button type="submit">{type === 'edit' ? 'Update Music' : 'Add Music'}</button>
        </form>
      </div>
    </div>
  );
};

// Styles for the popup overlay
const popupOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styles for the popup content
const popupStyles = (isDarkMode) => css`
  background: ${isDarkMode ? '#2D3748' : 'white'};
  color: ${isDarkMode ? 'white' : 'black'};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;

// Styles for the close button
const closeButtonStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 20px;
  color: inherit;
`;

// Styles for the input fields
const inputStyles = (isDarkMode) => css`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${isDarkMode ? '#4A5568' : '#ccc'};
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  background: ${isDarkMode ? '#4A5568' : '#F7FAFC'};
  color: ${isDarkMode ? 'white' : 'black'};

  &:focus {
    outline: none;
    border-color: ${isDarkMode ? '#F7FAFC' : '#4A5568'};
    background: ${isDarkMode ? '#2D3748' : '#FFFFFF'};
  }
`;

export default AddMusicPopup;
