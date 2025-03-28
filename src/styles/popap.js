import styled from "styled-components";

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Escurece um pouco mais */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContainer = styled.div`
  width: 40vw; /* Aumente a largura se necessário */
  min-height: 20vh;
  background-color: white; /* Fundo branco para destacar */
  color: ${({ type }) =>
    type === "success" ? "#155724" : type === "alert" ? "#856404" : "#721c24"};

  border-radius: 10px; /* Bordas arredondadas */
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Sombra mais forte */

  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  transition: opacity 0.5s ease; /* Adiciona transição de opacidade */
  opacity: 1; /* Opacidade padrão para o popup visível */

  /* Adicione uma classe ou propriedade condicional se precisar controlar a opacidade */
  &.hidden {
    opacity: 0; /* Opacidade para ocultar o popup */
  }
`;

export const PopupMessage = styled.p`
  margin: 0;

  padding-right: 30px; /* Espaço para o botão de fechar */
  padding-top: 5%;
  color: ${({ type }) =>
    type === "error" ? "red" : type === "alert" ? "#ffa500" : "green"};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: red; /* Muda a cor ao passar o mouse */
    background: none;
  }
`;

export const Title = styled.h2`
  text-align: left;
  margin-bottom: 10px;
  color: #333;
  padding: 0.3rem 0.2rem;
  margin-bottom: 0;
  border-bottom: 1px solid #e3e6f0;
  color: #046ee5;
`;
