import { css } from 'styled-components';

export const resetCss = css`
  button {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block: 0;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
  }
`;
