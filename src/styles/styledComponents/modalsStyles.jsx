import styled from "styled-components";
import { Status } from "./statusStyles";
import { Transition } from "./transitionsStyles";

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: .9rem;
  width: 100%;

  input, select, button {
    background: ${({ theme }) => theme.colors.steelGray};
    border: .0625rem solid ${({ theme }) => theme.colors.steelGray};
    border-radius: .375rem;
    box-sizing: border-box;
    color: #fff;
    padding: .75rem .375rem;
    width: 100%;
  }

  input, select {
    margin-top: .5rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    margin-top: .75rem;
    ${Transition}
  }

  button:hover {
    opacity: .8;
  }
`;

export const ModalViewInfoContainer = styled.table`
  border-collapse: separate;
  width: 100%;
  font-size: .9rem;
  box-sizing: border-box;

  tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5rem 0;

    &:not(:last-child) {
      border-bottom: .0625rem solid ${({ theme }) => theme.colors.steelGray};
    }

    &:first-child {
      padding-top: 0px;
    }

    &:last-child {
      align-items: flex-start;
      flex-direction: column;
      padding-bottom: 0px;
    }
  }
  
  td {
    text-transform: uppercase;
    padding: .25rem 0;
  }

  .maintenance__info-title {
    font-weight: 600;
    padding-right: 1rem;
    width: 186px;
  }

  .maintenance__description {
    text-transform: initial;
    line-height: normal;
    padding-right: .75rem;
    max-height: 150px!important;
    overflow-y: auto!important;
  }

  .status {
    ${Status}
  }
`;