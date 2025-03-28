import { Link } from "react-router-dom"; // Import Link do react-router-dom
import styled from "styled-components";
//import { Title } from "./global"; // Importando o Title de global.js

export const Title = styled.h1`
  /* estilos que agora estão no global.js */
  margin: 0px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 15rem 1fr; /* Usando rem em vez de px */
  grid-template-rows: 3.75rem 1fr; /* 3.75rem = 60px */
  height: 100vh;

  @media only screen and (max-width: 768px) {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: 3.75rem 1fr;
  }
`;

export const Main = styled.main`
  grid-area: main;
  padding: 1.25rem; /* 1.25rem = 20px */
  overflow-y: auto;
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem; /* 1.5rem = 24px */
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const Content = styled.div`
  height: 100%;
  padding: 0.3125rem; /* 0.3125rem = 5px */
`;

export const UserInfo = styled.div`
  margin-bottom: 1.25rem; /* 1.25rem = 20px */
`;

export const LogoutButton = styled.button`
  background-color: #046ee5;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem; /* Usando rem para padding: 10px 20px */
  border-radius: 0.3125rem; /* 0.3125rem = 5px */
  cursor: pointer;
  font-size: 1rem; /* 1rem = 16px */
  margin-top: 0.625rem; /* 0.625rem = 10px */

  &:hover {
    background-color: #0356b3;
  }
`;

export const SidebarLink = styled(Link)`
  border-bottom: 1px solid #c8cad0;
  text-decoration: none;
  color: #000;
  padding: 0.625rem 0; /* 0.625rem = 10px */
  display: flex; /* Definindo o display como flex */
  justify-content: space-between; /* Isso vai alinhar o conteúdo à esquerda e à direita */
  align-items: center; /* Para garantir que os itens estejam alinhados verticalmente */

  &:hover {
    color: #046ee5;
  }
`;

export const Sidebar = styled.nav`
  width: 14rem; /* 15rem = 240px */

  padding: 1.25rem; /* 1.25rem = 20px */
  box-shadow: 0.125rem 0 0.3125rem rgba(0, 0, 0, 0.1); /* 0.125rem = 2px, 0.3125rem = 5px */

  @media only screen and (max-width: 768px) {
    width: 100%;
    display: none;
  }

  &.active {
    display: block;
  }
`;

export const Header = styled.header`
  grid-area: header;
  background-color: #0b04e5;
  color: white;
  padding: 0 1.25rem; /* 1.25rem = 20px */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FontControls = styled.div`
  display: flex;
  gap: 0.625rem; /* 0.625rem = 10px */
`;

export const FontButton = styled.button`
  background-color: white;
  color: #046ee5;
  border: none;
  padding: 0.3125rem 0.625rem; /* Usando rem: 5px 10px */
  border-radius: 0.3125rem; /* 0.3125rem = 5px */
  cursor: pointer;
  font-size: 0.875rem; /* 0.875rem = 14px */
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;
