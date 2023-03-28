import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quattrocento', serif;
  }

  a{
    text-decoration: none;
    color: black;
  }

  body {
    background-color: ${(props) => props.theme.primaryColor};
    min-height: 100vh;
    font-family: 'Quattrocento', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
      ::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  }
`;
