/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button, Input, FormControl, FormLabel, FormErrorMessage, Icon, Image, Spinner, Box, Alert, AlertIcon, Text } from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Header from './header.component';
import { useTheme } from '../utils/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GITHUB_LOGIN, LOGIN_USER, REGISTER_USER, RESET_ERROR } from '../redux/slices/authSlice';

const AuthForm = ({ type }) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { status, error } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const authForm = useRef(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const dispatch = useDispatch();

  const isEmailError = email === '';
  const isPasswordError = password === '';
  const isUsernameError = type === 'signup' && username === '';
  const isConfirmPasswordError = type === 'signup' && (confirmPassword === '' || confirmPassword !== password);

  useEffect(() => {
    
    if (status === 'succeeded' && user!=null) {
      setIsLoading(false);
      console.log("Authentication Successful");
      navigate('/dashboard');
    } else if (status === 'failed') {
      setIsLoading(false);
      console.log("Error", error);
      
    }
    const timer = setTimeout(() => {
      dispatch(RESET_ERROR());
    }, 3000);
    return () => clearTimeout(timer);
  
  }, [status, error, navigate, dispatch, user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true); 

    if (type === 'signin') {
      const userInfo = { email, password };
      dispatch(LOGIN_USER(userInfo));
    } else {
      const userInfo = { name: username, email, password };
      dispatch(REGISTER_USER(userInfo));
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true); 
    dispatch(GITHUB_LOGIN());
  };

  return (
    <section css={sectionStyles(isDarkMode)}>
      <Header />
      <div css={contentWrapperStyles}>
        <div css={formContainerStyles}>
          <h1 css={headerStyles(isDarkMode)}>
            {type === 'signin' ? 'Sign In' : 'Sign Up'}
          </h1>
          {type === 'signin' ? (
            <p css={toggleTextStyles(isDarkMode)}>
              Don’t have an account?{' '}
              <a href="/signup" css={linkStyles}>
                Create a free account
              </a>
            </p>
          ) : (
            <p css={toggleTextStyles(isDarkMode)}>
              Already have an account?{' '}
              <a href="/signin" css={linkStyles}>
                Sign In
              </a>
            </p>
          )}

          {/* Display Error Message */}
          {status === 'failed' && error && (
            <Alert status="error" css={alertStyles}>
              <AlertIcon boxSize="25px" color="gray.500" mr={10} ml={10}/>
              <Text fontSize="sm" color={isDarkMode ? 'white' : 'black'}>
                {error}
              </Text>
            </Alert>
          )}

          <form ref={authForm} onSubmit={handleSubmit} css={formStyles}>
            {type === 'signup' && (
              <div css={formGroupStyles}>
                <FormControl isInvalid={isUsernameError}>
                  <FormLabel css={labelStyles(isDarkMode)}>
                    User Name
                  </FormLabel>
                  <Input
                    type="text" 
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="User name"
                    css={inputStyles(isDarkMode)}
                  />
                 
                </FormControl>
              </div>
            )}
            <div css={formGroupStyles}>
              <FormControl isInvalid={isEmailError}>
                <FormLabel css={labelStyles(isDarkMode)}>
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email to get started"
                  css={inputStyles(isDarkMode)}
                />
              </FormControl>
            </div>

            <div css={formGroupStyles}>
              <FormControl isInvalid={isPasswordError}>
                <FormLabel css={labelStyles(isDarkMode)}>
                  Password
                </FormLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  css={inputStyles(isDarkMode)}
                />
                <Box onClick={toggleShowPassword} css={passwordToggleStyles}>
                  <Icon as={showPassword ? FaEyeSlash : FaEye} />
                </Box>
               
              </FormControl>
            </div>

            {type === 'signup' && (
              <div css={formGroupStyles}>
                <FormControl isInvalid={isConfirmPasswordError}>
                  <FormLabel css={labelStyles(isDarkMode)}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm password"
                    css={inputStyles(isDarkMode)}
                  />
                  <Box onClick={toggleShowPassword} css={passwordToggleStyles}>
                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                  </Box>
                  {isConfirmPasswordError && (
                    <FormErrorMessage>Passwords don't match</FormErrorMessage>
                  )}
                </FormControl>
              </div>
            )}

            <Button
              type="submit"
              css={submitButtonStyles}
              isDisabled={
                isEmailError ||
                isPasswordError ||
                (type === 'signup' && (isUsernameError || isConfirmPasswordError))
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner size="sm" color="white" />
              ) : (
                `${type === 'signin' ? 'Sign In' : 'Sign Up'}`
              )}
            </Button>
          </form>

          {type === 'signin' && (
            <div css={githubButtonWrapperStyles}>
              <Button
                onClick={handleGitHubSignIn}
                css={githubButtonStyles(isDarkMode)}
                leftIcon={<Icon as={FaGithub} />}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  'Sign in with GitHub'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div css={imageContainerStyles(isDarkMode)}>
        <Image css={imageStyles} src="/logo.png" alt="Logo" />
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthForm;


// Helper functions for dynamic styles
const backgroundGradient = (isDarkMode) =>
  isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)';

const sectionStyles = (isDarkMode) => css`
  width: 100vw;
  background: ${backgroundGradient(isDarkMode)};
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  margin: 0;
  padding: 0;
`;

const contentWrapperStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;

  @media (min-width: 640px) {
    padding: 4rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3.5rem 3rem;
  }
`;

const formContainerStyles = css`
  max-width: 100%;
  width: 100%;

  @media (min-width: 1280px) {
    max-width: 24rem;
  }
`;

const headerStyles = (isDarkMode) => css`
  margin-left: 150px;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${isDarkMode ? 'white' : 'gray'};
  line-height: 2rem;

  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
`;

const toggleTextStyles = (isDarkMode) => css`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: ${isDarkMode ? 'white' : '#4a5568'};
`;

const linkStyles = css`
  font-weight: 500;
  color: #3182ce;
  transition: color 0.2s;

  &:hover {
    color: #2b6cb0;
    text-decoration: underline;
  }
`;

const alertStyles = css`
  border-radius: 0.375rem;
  background-color: #f56565;
  margin-top: 1rem;
`;

const formStyles = css`
  margin-top: 2rem;
`;

const formGroupStyles = css`
  margin-bottom: 1.25rem;
`;

const labelStyles = (isDarkMode) => css`
  font-size: 1rem;
  font-weight: 500;
  color: ${isDarkMode ? 'white' : '#2d3748'};
`;

const inputStyles = (isDarkMode) => css`
  margin-top: 0.625rem;
  padding: 1rem;
  width: 90%;
  background-color: ${isDarkMode ? '#101212' : '#F2F5D5'};
  color: ${isDarkMode ? 'white' : 'black'};
  border: 1px solid #edf2f7;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    background-color: ${isDarkMode ? 'black' : 'white'};
  }
`;

const passwordToggleStyles = css`

        position: relative;
        left: 350px; /* Adjust as needed for proper alignment */
        bottom: 20px; /* Center vertically */
        transform: translateY(-50%);
        cursor: pointer;
        color: grey; /* Set icon color to grey *
`;

const submitButtonStyles = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #d69e2e; /* Dark Yellow */
  color: white;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b7791f; /* Darker shade of yellow */
  }
`;

const githubButtonWrapperStyles = css`
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const githubButtonStyles = (isDarkMode) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${isDarkMode ? 'white' : '#D3D3D3'};
  color: black;
  border: 2px solid #edf2f7;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #f7fafc;
    color: black;
    border-color: #cbd5e0;
  }
`;

const imageContainerStyles = (isDarkMode) => css`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: ${isDarkMode
    ? 'linear-gradient(to top, #101212, #08201D)'
    : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
  background-color: #f7fafc;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const imageStyles = css`
  max-width: 100%;
`;
