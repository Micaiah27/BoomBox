/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { FaHome, FaMusic, FaUserAlt, FaList } from 'react-icons/fa'; // Example icons
import { getLoggedInUser } from '../api/authApi';

const Dashboard = () => {
  const loggedIn = getLoggedInUser();

  return (
    <div css={dashboardStyles}>
      <SideBar />
      <div css={mainContentStyles}>
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.name || 'Guest'}
          subtext="Explore your world of music seamlessly."
        />
      </div>
    </div>
  );
};

// Sidebar Component
const SideBar = () => {
  const pathname = window.location.pathname;
  const sidebarLinks = [
    { label: 'Home', icon: FaHome, route: '/dashboard/all' },
    { label: 'Artists', icon: FaUserAlt, route: '/dashboard/artists' },
    { label: 'Albums', icon: FaMusic, route: '/dashboard/albums' },
    { label: 'Genres', icon: FaList, route: '/dashboard/genres' }
  ];

  return (
    <section css={sidebarStyles}>
      <nav css={navStyles}>
        <div css={logoContainerStyles}>
          <h1 css={logoTextStyles}>BoomBox</h1>
        </div>
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <a
              href={item.route}
              key={item.label}
              css={[linkStyles, isActive && activeLinkStyles]}
            >
              <item.icon css={iconStyles} />
              <p css={[labelStyles, isActive && activeLabelStyles]}>{item.label}</p>
            </a>
          );
        })}
      </nav>
    </section>
  );
};

// HeaderBox Component
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

// Emotion CSS-in-JS styles
const dashboardStyles = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f5f7fa; /* Light background */
`;

const mainContentStyles = css`
  flex: 1;
  padding: 2rem;
  background-color: #f9fafb; 
`;

const sidebarStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95vh;
  width: 250px;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
  background-color: #D69E2E; 
`;

const navStyles = css`
  display: flex;
  flex-direction: column;
`;

const logoContainerStyles = css`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
`;

const logoTextStyles = css`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;

const linkStyles = css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D69E24; /* Hover state background */
  }
`;

const iconStyles = css`
  margin-right: 0.75rem;
  font-size: 20px;
`;

const activeLinkStyles = css`
  background-color: #2563eb; /* Active state background */
`;

const labelStyles = css`
  font-size: 16px;
  font-weight: 500;
`;

const activeLabelStyles = css`
  color: white;
`;

const headerBox = css`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin-left: 20px;
  gap: 1rem;
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

export default Dashboard;
