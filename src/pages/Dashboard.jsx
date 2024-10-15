/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaHome, FaMusic, FaUserAlt, FaList, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../utils/ThemeContext';
import MusicCard from '../components/MusicCard';
import AddMusicCard from '../components/AddMusicCard';
import AddMusicPopup from '../components/AddMusicPopup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FETCH_USER_SONGS, UPDATE_SONG, ADD_SONG, DELETE_SONG } from '../redux/slices/songSlice';
import { LOGOUT_USER } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  
  const { isDarkMode } = useTheme();
  const [activeCardIndex, setActiveCardIndex] = useState(null); // State for managing active card
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [currentMusic, setCurrentMusic] = useState(null); // Holds the music being edited or added
  const [activeLink, setActiveLink] = useState('all'); // Manages active sidebar link
  
  const user = useSelector((state) => state.auth.user);
  


  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(FETCH_USER_SONGS(user.userId));
    }
  }, [dispatch,user]);
  

  const songs = useSelector((state) => state.songs.songs);

  
  const handleEditMusic = (index) => {
    setCurrentMusic(songs[index]);
    
    setIsPopupOpen(true);
  };

  // Add or edit music based on the popup type
  const handleEditandAddMusic = (newMusic, type) => {
    const songId = currentMusic?.$id;
    console.log(currentMusic?.$id)
    const userId = user.userId;
    const newSongWithId = { ...newMusic, userId };
    const updatedSongWithId = {...newMusic, songId}
    if (type === 'edit' && currentMusic) {
      dispatch(UPDATE_SONG(updatedSongWithId, songId)); // Dispatch the update action
    } else {
      dispatch(ADD_SONG(newSongWithId)); // Dispatch the add action
    }
    closePopup();
  };
  

  // Delete music by index
  const handleDeleteMusic = (index) => {
    const songToDelete = songs[index];
    if (window.confirm('Are you sure you want to delete this music?')) {
      dispatch(DELETE_SONG(songToDelete.$id)); // Dispatch the delete action
    }
  };
  

  // Toggle card options (e.g., edit, delete)
  const toggleCardOptions = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  // Close popup and reset current music
  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentMusic(null);
  };

  // Dynamically render music cards based on the active link
  const rendersongs = () => {
    return songs.map((music, index) => (
      <MusicCard
  key={index}
  imgSrc={music.Image}
  title={
    activeLink === 'all'
      ? music.title
      : activeLink === 'artists'
      ? music.artist
      : activeLink === 'albums'
      ? music.album
      : music.genre
  }
  artist={
    activeLink === 'all'
      ? `${music.artist}${music.album ? ` ●  ${music.album}` : ''}` // Add hyphen only if artist exists
      : activeLink === 'artists'
      ? music.genre
      : null
  }
  album={
    activeLink === 'all'
      ? music.album
      : activeLink === 'albums'
      ? music.genre
      : null
  }
  genre={activeLink === 'all' ? music.genre : null}
  isActive={activeCardIndex === index}
  onToggle={() => toggleCardOptions(index)}
  onEdit={() => handleEditMusic(index)}
  onDelete={() => handleDeleteMusic(index)}
/>

    ));
  };

  return (
    <div css={dashboardStyles(isDarkMode)}>
      <SideBar setActiveLink={setActiveLink} activeLink={activeLink} />
      <div css={mainContentStyles(isDarkMode)}>
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={user?.name||user?.providerUid || ' '}
          subtext="Explore your world of music seamlessly."
        />
        <div css={songsContainerStyles(isDarkMode)}>
          {rendersongs()}
          <AddMusicCard
            onAdd={() => {
              setCurrentMusic(null); // Reset for adding new music
              setIsPopupOpen(true);
            }}
            isDarkMode={isDarkMode}
          />
        </div>
        {isPopupOpen && (
          <AddMusicPopup
            onClose={closePopup}
            onAddMusic={(music) => handleEditandAddMusic(music, currentMusic ?  'edit' : 'add')}
            isDarkMode={isDarkMode}
            type={currentMusic ? 'edit' : 'add'}
            initialMusic={currentMusic}
          />
        )}
      </div>
    </div>
  );
};

// Sidebar Component
const SideBar = ({ setActiveLink, activeLink }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarLinks = [
    { label: 'All', icon: FaHome, route: 'all' },
    { label: 'Artists', icon: FaUserAlt, route: 'artists' },
    { label: 'Albums', icon: FaMusic, route: 'albums' },
    { label: 'Genres', icon: FaList, route: 'genres' },
  ];

  const handleLogout = () => {
    dispatch(LOGOUT_USER())
    navigate('/')
  }

  return (
    <section css={sidebarStyles(isDarkMode)}>
      <nav css={navStyles}>
        <div css={logoContainerStyles}>
          <h1 css={logoTextStyles(isDarkMode)}>BoomBox</h1>
        </div>
        {sidebarLinks.map((item) => (
          <a
            key={item.label}
            onClick={() => setActiveLink(item.route)}
            css={[linkStyles(isDarkMode), activeLink === item.route && activeLinkStyles]}
          >
            <item.icon css={iconStyles} />
            <p css={labelStyles(isDarkMode)}>{item.label}</p>
          </a>
        ))}
        <a onClick={handleLogout} css={logoutStyles(isDarkMode)}>
          <FaSignOutAlt css={iconStyles} />
        </a>
      </nav>
    </section>
  );
};

// HeaderBox Component
const HeaderBox = ({ type, title, subtext, user }) => {
  const { isDarkMode } = useTheme();

  return (
    <div css={headerBox(isDarkMode)}>
      <h1 css={headerBoxTitle(isDarkMode)}>
        {title}
        {type === 'greeting' && <span css={textBankGradient}>&nbsp;{user}</span>}
      </h1>
      <p css={headerBoxSubtext(isDarkMode)}>{subtext}</p>
    </div>
  );
};


// Emotion CSS-in-JS styles with dark mode support
const dashboardStyles = (isDarkMode) => css`
  margin-top: 45px;
  padding: 10px;
  display: flex;
  height: 100vh;
  width: 100vw;
  background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
`;

const mainContentStyles = (isDarkMode) => css`
  flex: 1;
  background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
`;

const sidebarStyles = (isDarkMode) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95vh;
  width: 250px;
  border-right: 1px solid ${isDarkMode ? '#4A5568' : '#e5e7eb'};
  padding: 1rem;
  background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to bottom, #F3F4F6, #FFFFFF)'};
`;

const navStyles = css`
  display: flex;
  flex-direction: column;
`;

const logoContainerStyles = css`
  display: flex;
  align-items: center;
  
`;

const logoTextStyles = (isDarkMode) => css`
  font-size: 28px;
  font-weight: bold;
  color: ${isDarkMode ? 'white' : 'black'};
`;

const linkStyles = (isDarkMode) => css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: ${isDarkMode ? '#CBD5E0' : 'gray'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${isDarkMode ? '#4A5568' : '#D69E24'};
  }
`;

const iconStyles = css`
  margin-right: 0.75rem;
  font-size: 20px;
`;

const activeLinkStyles = css`
  background-color: #2563eb;
`;

const labelStyles = (isDarkMode) => css`
  font-size: 16px;
  font-weight: 500;
  color: ${isDarkMode ? '#E2E8F0' : 'black'};
`;

const activeLabelStyles = css`
  color: white;
`;

const headerBox = (isDarkMode) => css`
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  margin-left: 20px;
`;

const headerBoxTitle = (isDarkMode) => css`
  font-size: 24px;
  font-weight: 600;
  color: ${isDarkMode ? '#F7FAFC' : '#1f2937'};

  @media (min-width: 1024px) {
    font-size: 30px;
  }
`;

const headerBoxSubtext = (isDarkMode) => css`
  font-size: 14px;
  font-weight: 400;
  color: ${isDarkMode ? '#A0AEC0' : '#4b5563'};

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const textBankGradient = css`
  background: linear-gradient(to right, #F472B6, #F87171);
  -webkit-background-clip: text;
  color: transparent;
`;

const logoutStyles = (isDarkMode) => css`
   margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: ${isDarkMode ? '#e53e3e' : '#e53e3e'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: ${isDarkMode ? '#f56565' : '#c53030'};
    color: ${isDarkMode ? '#F7FAFC' : '#FFF'};
  }

  position: absolute;
  bottom: 40px;
  left: 220px;
  `
const songsContainerStyles = (isDarkMode) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px;
  margin-top: 20px;
  height: 450px;
  margin-bottom: 100px;  
  overflow-y: auto; /* Enables vertical scrolling */
  /* Adjust based on header height and sidebar */
 background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
`;


export default Dashboard;
