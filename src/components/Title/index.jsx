import styled from "styled-components"

const TitleStyled = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  margin: 1rem 0rem;
`;

export default function Title({title}) {
  return (
    <TitleStyled>{title}</TitleStyled>
  )
}
