/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Footer = () => {
    return (
        <footer css={css`
            background-color: #101212;
            padding: 5px;
            text-align: center;
            color: white;
            font-size: 0.9rem;
        `}>
            <p>
                &copy; {new Date().getFullYear()} by Mikiyas. Visit the source code on{' '}
                <a
                    href="https://github.com/Micaiah27"
                    target="_blank"
                    rel="noopener noreferrer"
                    css={css`
                        color: #FFD700;
                        text-decoration: none;
                        &:hover {
                            text-decoration: underline;
                        }
                    `}
                >
                    GitHub
                </a>
            </p>
        </footer>
    );
};

export default Footer;
