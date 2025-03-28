import styled from "styled-components";

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 0rem;
  font-size: .9rem;
  margin: 2rem 0 0rem 0;
  width: 100%;

  tr {
    border: 0;
    margin: .3125rem;
  }

  .info {
    cursor: pointer;

    &:hover {
      background-color:  #c8cad0;
    }
  }

  th {
    font-weight: 700;
    text-align: center;
    padding-bottom: 1.25rem;
    border-bottom: .0625rem solid #c8cad0;
  }

  td {
    text-align: center;
    padding: .9375rem .625rem;
    border-bottom: 1px solid #c8cad0;
    vertical-align: middle;
    text-transform: uppercase;
  }

  @media (max-width: 767px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;