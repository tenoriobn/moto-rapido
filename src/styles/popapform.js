import styled from "styled-components";

export const PopupTitle = styled.h2`
  margin: 0; /* Remove margens padrão */
  font-size: 1.5rem; /* Tamanho da fonte do título */
  color: #333; /* Cor do texto do título */
  text-align: center; /* Centraliza o texto do título */
`;

export const Popup = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  position: fixed; /* Fixa a posição do popup */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escurecido */
  z-index: 999; /* Garante que o popup fique acima de outros elementos */
`;
export const PopupContainer = styled.div`
  /* Renomeado para PopupContainer */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin: auto;
  z-index: 1000;
`;
export const PopupRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os campos quebrem para a próxima linha se necessário */
  gap: 1.5rem; /* Espaçamento entre os campos */

  @media (max-width: 768px) {
    flex-direction: column; /* Em telas menores, os campos ficam em coluna */
    gap: 1rem; /* Reduz o espaçamento entre os campos em telas menores */
  }
`;
export const PopupFormGroup = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 1rem; 

  &.button-group {
    display: flex;
    flex-direction: row; // Alterado para row para alinhar horizontalmente
    justify-content: flex-end;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  label {
    margin-bottom: 0.1rem;
  }

  input,
  select {
    width: 100%;
  }
`;

export const PopupSubmitButton = styled.button`
  flex: 1;
  width: auto;
  padding: 0.8rem 1.5rem;
  min-width: 120px; // Adicionado para garantir largura mínima
`;
