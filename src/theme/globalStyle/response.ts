import { css } from 'styled-components';

export const responsive = css`
  html {
    font-size: 62.5%; /* 1rem = 10px, 10/16 = 62.5% */
  }

  @media only screen and (max-width: 90em) {
    html {
      font-size: 56.25%; /* 1 rem = 9px, 9/16 = 56.25% */
    }
  }

  @media only screen and (max-width: 64em) {
    html {
      font-size: 50%; /* 1 rem = 8px, 8/16 = 50% */
    }
  }

  @media only screen and (max-width: 30em) {
    html {
      font-size: 43.75%; /* 1 rem = 7px, 7/16 = 43.75% */
      overflow-x: scroll;
    }
  }
`;
