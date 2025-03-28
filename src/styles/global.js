import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`



     @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${({ fontSize }) =>
      fontSize || "1rem"}; /* Usa rem para tamanhos de fonte responsivos */ 
    transition: font-size 0.3s ease;
  }

  button, input, select, textarea {
    font-size: inherit; /* Mantém a herança do tamanho da fonte do body */
    padding: 0.625rem; /* Usa rem ao invés de px para padding */
    border: 1px solid #ccc; /* Borda padrão */
    border-radius: 0.3125rem; /* Bordas arredondadas em rem */
  }

  input {
    background-color: #f8f9fc; /* Cor de fundo dos inputs */
    border: 1px solid #ccc;
    border-radius: 0.25rem; /* Bordas em rem */
    width: 100%; /* Garante que o input ocupe toda a largura disponível */
  }

  button {
    background-color: #046ee5; /* Cor de fundo dos botões */
    color: white; /* Cor do texto dos botões */
    cursor: pointer; /* Mudança de cursor ao passar o mouse */
    width: auto; /* Define o tamanho automático do botão */
    padding: 0.625rem 1.25rem; /* Padding em rem para tornar responsivo */
  }

  button:hover {
    background-color: #0356b3; /* Cor do botão ao passar o mouse */
  }

  h2 {
    font-size: ${({ fontSize }) => fontSize * "0.1rem"}; 
    color: #333;

    
     /* Mantém o tamanho de fonte herdado font-size: inherit;*/
  }
  h1 {
    margin-bottom: 1rem;
    font-size: inherit;
    color: #fff;
     /* Mantém o tamanho de fonte herdado font-size: inherit;*/
  } 

  label {
    font-size: ${({ fontSize }) =>
      fontSize * "0.17rem"};  /* Tamanho do label padrão */
  }

  
`;

export default GlobalStyle;
