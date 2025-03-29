import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainContainer = styled.main`
  @media (min-width: 992px) {
    margin-left: 300px;
  }
`;

export default function AppLayout() {
  return (
    <>
      <Sidebar />

      <MainContainer>
          <Outlet />
      </MainContainer>
    </>
  )
}
