import styled from "styled-components";
import { Status } from "./statusStyles";
import { Transition } from "./transitionsStyles";

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 1rem;
  font-size: .9rem;
  margin: 4.5rem 0 1.5rem 0;
  width: 100%;

  tr {
    border: 0;
    margin: .3125rem;
  }

  th {
    font-weight: 700;
    text-align: center;
    padding-bottom: 1.25rem;
  }

  td {
    text-align: center;
    padding: .9375rem .625rem;
    background-color: ${({ theme }) => theme.colors.mediumGray};
    vertical-align: middle;
    text-transform: uppercase;
  }

  td:first-child {
    border-top-left-radius: .3125rem;
    border-bottom-left-radius: .3125rem;
  }

  td:last-child {
    border-top-right-radius: .3125rem;
    border-bottom-right-radius: .3125rem;
  }

  .status {
    ${Status}
  }

  
  .button__container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .375rem;
    border: none;
    border-radius: .3125rem;
    box-sizing: border-box;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    font-size: .875rem;
    text-transform: uppercase;
    ${Transition}
    padding: 0 .9375rem;
    width: 100%;
    max-width: 110px;
    height: 38px;

    &:hover {
      opacity: .8;
    }
  }

  .button__view {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
  }

  .button__edit {
    background-color: ${({ theme }) => theme.colors.goldenYellow};
  }

  .button__delete {
    background-color: ${({ theme }) => theme.colors.orange};
  }

  @media (max-width: 767px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;