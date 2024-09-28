/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const HeaderBox = ({ type = "title", title, subtext, user }) => {
  return (
    <div css={headerBox}>
      <h1 css={headerBoxTitle}>
        {title}
        {type === 'greeting' && (
          <span css={textBankGradient}>
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p css={headerBoxSubtext}>{subtext}</p>
    </div>
  );
};

export default HeaderBox;

// Styles for the HeaderBox component
const headerBox = css`
  margin-top: 120px;
  margin-left: 250px;
  display: grid;
  width: 50vw;
 justify-content: center;
  flex-direction: row;
  gap: rem; /* Similar to Tailwind's gap-1 */
`;

const headerBoxTitle = css`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937; /* Tailwind's text-gray-900 */
  
  @media (min-width: 1024px) {
    font-size: 30px; /* Larger text size on lg screens */
  }
`;

const headerBoxSubtext = css`
  font-size: 14px;
  font-weight: 400;
  color: #4b5563; /* Tailwind's text-gray-600 */
  
  @media (min-width: 1024px) {
    font-size: 16px; /* Larger text size on lg screens */
  }
`;

const textBankGradient = css`
  background: linear-gradient(to right, #F472B6, #F87171);
  -webkit-background-clip: text;
  color: transparent;
`;
