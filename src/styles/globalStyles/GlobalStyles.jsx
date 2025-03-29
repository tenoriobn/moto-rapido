import { createGlobalStyle } from "styled-components";
import { Transition } from "../styledComponents/transitionsStyles";

const GlobalStyles = createGlobalStyle`
  body {
    outline: none;
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.colors.jetBlack};
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.font.montserrat};
    min-height: 100vh;
    overflow-x: hidden;

    li {
      list-style-type: none;
    }

    a {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: none;
    }

    button, input, textarea, select {
      outline: none;
      font-family: ${({ theme }) => theme.montserrat};
      font-size: 1rem;
    }
    
    select {
      cursor: pointer;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.coolGray};
    padding: .625rem;
    border-radius: .625rem;
    ${Transition}
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.coolGray};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.transparentBlack};
    border-radius: .625rem;
  }

  ::-moz-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.black};
    width: .5rem;
  }
`;

export default GlobalStyles;