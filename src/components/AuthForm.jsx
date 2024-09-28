/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import {  Button, Input, FormControl, FormLabel, FormHelperText, FormErrorMessage, Stack, Heading, Icon, Image } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Header from './header.component';
import { useTheme } from './ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AuthForm = ({ type }) => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const {status, error} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const dispatch = useDispatch();

  const isEmailError = email === '';
  const isPasswordError = password === '';
  const isUsernameError = type === 'signup' && username === '';

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (type === 'signup') {
      dispatch({
        type: 'auth/register',
        payload: { email, password, name: username },
      })
      successMessage();
      
    } else {
      dispatch({
        type: 'auth/login',
        payload: { email, password },
      });
      successMessage()
    }
  };

  const handleGitHubSignIn = async () => {
    dispatch({ type: 'auth/githubSignIn' });
    successMessage();
  };

  const successMessage = () =>{
    if(status === 'succeeded'){
      navigate('/dashboard');
    }
    else if(status === 'failed'){
      console.log("Error", error);
    }
  }

  return (
    
    <section
      css={css`
        width: 100vw;
         background: ${isDarkMode
          ? 'linear-gradient(to top, #101212, #08201D)'
          : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        @media (min-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }
        margin: 0;
        padding: 0;
      `}
    >
      <Header/>
      <div
        css={css`
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
        `}
      >
        <div
          css={css`
            max-width: 100%;
            width: 100%;
            @media (min-width: 1280px) {
              max-width: 24rem;
            }
          `}
        >
          <h1
            css={css`
              margin-left: 150px;
              margin-bottom: 2rem;
              font-size: 1rem;
              font-weight: bold;
              color: ${isDarkMode ? 'white' : 'gray'};
              line-height: 2rem;
              @media (min-width: 640px) {
                font-size: 2.25rem;
              }
            `}
          >
            {type === 'signin' ? 'Sign In' : 'Sign Up'}
          </h1>
          {type === 'signin'? (<p
            css={css`
              margin-top: 0.5rem;
              font-size: 1rem;
              color: ${isDarkMode ? 'white' : '#4a5568'};
            `}
          >
            Don’t have an account?{' '}
            <a
              href="/signup"
              css={css`
                font-weight: 500;
                color: #3182ce;
                transition: color 0.2s;
                &:hover {
                  color: #2b6cb0;
                  text-decoration: underline;
                }
              `}
            >
              Create a free account
            </a>
          </p>):(<p
            css={css`
              margin-top: 0.5rem;
              font-size: 1rem;
              color: ${isDarkMode ? 'white' : 'gray'};
            `}
          >
            Already have an account?{' '}
            <a
              href="/signin"
              css={css`
                font-weight: 500;
                color: #3182ce;
                transition: color 0.2s;
                &:hover {
                  color: #2b6cb0;
                  text-decoration: underline;
                }
              `}
            >
              Sign In
            </a>
          </p>)}

          <form onSubmit={handleSubmit} css={css`margin-top: 2rem;`}>
          {type === 'signup' &&(<div
              css={css`
                margin-bottom: 1.25rem;
              `}
            >
              <FormControl isInvalid={isUsernameError}>
                <FormLabel
                  css={css`
                    font-size: 1rem;
                    font-weight: 500;
                    color: ${isDarkMode ? 'white' : '#2d3748'};
                  `}
                >
                  User Name
                </FormLabel>
                <Input
                  type="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="User name "
                  css={css`
                    margin-top: 0.625rem;
                    padding: 1rem;
                    width: 90%;
                    background-color:  ${isDarkMode ? '#101212' : '#F2F5D5'};
                    color: ${isDarkMode ? 'white' : 'black'};
                    border: 1px solid #edf2f7;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                    &:focus {
                      outline: none;
                      border-color: #3182ce;
                      background-color: ${isDarkMode ? 'black' : 'white'};
                    }
                  `}
                />
                {!isUsernameError ? (
                  <FormHelperText>You can only use alphanumeric characters.</FormHelperText>
                ) : (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
            </div>)}
            <div
              css={css`
                margin-bottom: 1.25rem;
              `}
            >
              <FormControl isInvalid={isEmailError}>
                <FormLabel
                  css={css`
                    font-size: 1rem;
                    font-weight: 500;
                    color: ${isDarkMode ? 'white' : 'gray'};
                  `}
                >
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email to get started"
                  css={css`
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
                  `}
                />
                {!isEmailError ? (
                  <FormHelperText>Email is required.</FormHelperText>
                ) : (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
            </div>

            <div
              css={css`
                margin-bottom: 1.25rem;
              `}
            >
              <FormControl isInvalid={isPasswordError}>
                <FormLabel
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    font-size: 1rem;
                    font-weight: 500;
                    color: ${isDarkMode ? 'white' : '#2d3748'};
                  `}
                >
                  Password
                  <a
                    href="#"
                    css={css`
                      font-size: 0.875rem;
                      color: #3182ce;
                      transition: color 0.2s;
                      &:hover {
                        color: #2b6cb0;
                        text-decoration: underline;
                      }
                    `}
                  >
                    Forgot password?
                  </a>
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  css={css`
                    margin-top: 0.625rem;
                    padding: 1rem;
                    width: 90%;
                    background-color: ${isDarkMode ? '#101212' : '#F2F5D5'};;
                    color: ${isDarkMode ? 'white' : 'black'};
                    border: 1px solid #edf2f7;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                    &:focus {
                      outline: none;
                      border-color: #3182ce;
                      background-color: ${isDarkMode ? 'black' : 'white'};
                    }
                  `}
                />
                {!isPasswordError ? (
                  <FormHelperText>Password is required</FormHelperText>
                ) : (
                  <FormErrorMessage></FormErrorMessage>
                )}
              </FormControl>
            </div>

            <Button
              type="submit"
              css={css`
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 1rem;
                font-size: 1rem;
                font-weight: 600;
                background-color: #D69E2E; /* Dark Yellow */
                color: white;
                border: none;
                border-radius: 0.375rem;
                transition: background-color 0.2s;
                &:hover {
                  background-color: #B7791F; /* Darker shade of yellow */
                }
              `}
              isDisabled={isEmailError || isPasswordError || isUsernameError}
            >
              {type === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          {type === 'signin'? (<div
            css={css`
              margin-top: 1.25rem;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            `}
          >
            <Button
              onClick={handleGitHubSignIn}
              css={css`
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                padding: 1rem;
                font-size: 1rem;
                font-weight: 600;
                background-color: ${isDarkMode ? 'white' : '#D3D3D3'};;
                color: black;
                border: 2px solid #edf2f7;
                border-radius: 0.375rem;
                transition: all 0.2s;
                &:hover {
                  background-color: #f7fafc;
                  color: black;
                  border-color: #cbd5e0;
                }
              `}
              leftIcon={<Icon as={FaGithub} />}
            >
              Continue with GitHub
            </Button>
          </div>): (<></>)}
        </div>
      </div>

      <div
        css={css`
          display: none;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          background:${isDarkMode
          ? 'linear-gradient(to top, #101212, #08201D)'
          : 'linear-gradient(to top, #F3F4F6, #FFFFFF)'};
          background-color: #f7fafc;
          @media (min-width: 1024px) {
            display: flex;
          }
        `}
      >
        <Image
          css={css`
            max-width: 100%;
          `}
          src="/logo.png"
          alt="Logo"
        />
      </div>
    </section>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthForm;
