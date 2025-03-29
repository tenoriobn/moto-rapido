import { Link } from "react-router-dom";
import styled from "styled-components";
import { Transition } from "./transitionsStyles";

export const Main = styled.div`
  padding: .75rem;

  @media (min-width: 992px) {
    padding: 1.25rem;
  }
`;

export const LinkItem = styled(Link)`
  border: none;
  display: inline-flex;
  align-items: center;
  gap: .3125rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: .3125rem;
  padding: .625rem .9375rem;
  ${Transition}

  &:hover {
    opacity: .8;
  }
`;