import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  html, body{
    width: 100%;
    min-height: 100vh;
  }
`;
