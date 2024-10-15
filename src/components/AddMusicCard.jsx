/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const AddMusicCard = ({ onAdd, isDarkMode }) => {
  return (
    <div css={addMusicCardStyles(isDarkMode)} onClick={onAdd}>
      <span css={plusIconStyles}>+</span>
    </div>
  );
};

const addMusicCardStyles = (isDarkMode) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  width: 180px; /* Set the width to match your music card */
  height: 200px; /* Set the height to match your music card */
  border: 2px dashed ${isDarkMode ? '#A0AEC0' : '#4a5568'}; /* Border style */
  border-radius: 10px; /* Optional: rounded corners */
  background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'}; /* Background color */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s;

  &:hover {
    background-color: ${isDarkMode ? '#4A5568' : '#e2e8f0'}; /* Change background on hover */
  }
`;

const plusIconStyles = css`
  font-size: 48px; /* Size of the plus icon */
  color: #4a5568; /* Color of the plus icon */
`;

export default AddMusicCard;
