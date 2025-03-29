import { css } from 'styled-components';

export const Status = css`
  display: inline-block;
  box-sizing: border-box;
  border-radius: .3125rem;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  padding: .5rem .75rem;
  min-width: 136px;
  max-width: 160px;
  width: 100%;

  &.status__active {
    background-color: ${({ theme }) => theme.colors.primaryGreen};
  }

  &.status__inactive {
    background-color: ${({ theme }) => theme.colors.slateGray};
  }

  &.status__maintenance {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;
