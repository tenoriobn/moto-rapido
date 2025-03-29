import styled from "styled-components"
import { useRecoilState } from "recoil"
import { stateMenuActive } from "src/store/atom.js";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.deepGray};
  padding: .75rem;

  button {
    cursor: pointer;
    background: transparent;
    padding: 0px;
    border: none;
    
    i {
      color: ${({ theme }) => theme.colors.white};
      font-size: 1.5rem;
    }
  }

  h2 {
    display: flex;
    align-items: center;
    gap: .375rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 992px) {
    padding: 1.25rem;

    h2 {
      font-size: 1.5rem;
    }

    button {
      display: none;
    }
  }
`;

export default function Header({ children }) {
  const [menuActive, setMenuActive] = useRecoilState(stateMenuActive)

  return (
    <HeaderContainer>
      <button onClick={() => setMenuActive(!menuActive)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {children}
    </HeaderContainer>
  )
}
