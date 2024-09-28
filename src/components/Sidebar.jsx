import { css } from '@emotion/react';
import React from 'react';
import { FaHome, FaMusic, FaUserAlt, FaList } from 'react-icons/fa'; // Example icons

const sidebarLinks = [
  { label: 'Home', icon: FaHome, route: '/dashboard/all' },
  { label: 'Artists', icon: FaUserAlt, route: '/dashboard/artists' },
  { label: 'Albums', icon: FaMusic, route: '/dashboard/albums' },
  { label: 'Genres', icon: FaList, route: '/dashboard/genres' }
];

const SideBar = () => {
  const pathname = window.location.pathname;

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

// Emotion CSS-in-JS styles
const sidebarStyles = css`
  display: grid;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 10px;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
  margin-top: none;
  background-color: #1e40af; /* Navy blue background */
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
  padding: 0.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: white;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b82f6; /* Hover state background */
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

export default SideBar;
