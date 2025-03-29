import styled from "styled-components";
import { Transition } from "./transitionsStyles";

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  gap: .625rem;
  padding: .625rem 0;

  @media (min-width: 922px) {
    justify-content: flex-start;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: .3125rem;
  color: #f5f5f5;
`;

export const FilterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;

  input {
    outline: none;
    height: max-content;
    border-radius: .375rem;
    color: ${({ theme }) => theme.colors.white};
    padding: .75rem;
    width: 100%;
    background: ${({ theme }) => theme.colors.jetBlack};
    border: .0625rem solid ${({ theme }) => theme.colors.coolGray};
    box-sizing: border-box;
    ${Transition}

    &:focus {
      border-color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }
`;

export const FilterSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;
  width: 100%;

  select {
    background: ${({ theme }) => theme.colors.jetBlack};
    color: ${({ theme }) => theme.colors.white};
    border: .0625rem solid ${({ theme }) => theme.colors.coolGray};
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 44px;
    width: 100%;
    line-height: normal;
    padding-right: 1.875rem;
    ${Transition}

    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right .5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }
`;

export const ButtonSearchForm = styled.button`
  border: none;
  border-radius: .375rem;
  background-color: ${({ theme }) => theme.colors.coolGray};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  padding: .75rem .9375rem;
  height: 44px;
  ${Transition}
  min-width: 112px;

  &:hover {
    opacity: .8;
  }
`;