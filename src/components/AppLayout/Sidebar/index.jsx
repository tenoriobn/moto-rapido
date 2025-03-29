import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateMenuActive, stateUserDate } from "src/store/atom.js";
import links from "./links.json";
import { Transition } from "src/styles/styledComponents/transitionsStyles";
import { removeCookieData } from "src/services/cookieService";

const ContainerSidebar = styled.div`
  background: ${({ theme }) => theme.colors.darkGray};
  box-sizing: border-box;
  box-shadow: .1875rem .0625rem .625rem -0.5625rem ${({ theme }) => theme.colors.black};
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.$menuActive ? "0px" : "-304px")};
  padding: .5rem;
  overflow-x: auto;
  ${Transition}
  width: 300px;
  z-index: 99;

  span {
    float: right;
    padding: .5rem;
  }

  @media (min-width: 992px) {
    left: 0px;

    span {
      display: none;
    }
  }
`;

const MenuHeader = styled.div`
  background: ${({ theme }) => theme.colors.darkGray};
  text-align: center;
  line-height: 1.125rem;
  margin-top: 2.5rem;
  padding-bottom: 2.125rem;
  border-bottom: .0625rem solid ${({ theme }) => theme.colors.deepGray};
  border-bottom-left-radius: .625rem;
  border-bottom-right-radius: .625rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    margin-bottom: 1.5rem;
    ${Transition}

    &:hover {
      opacity: .8;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .25rem;
    justify-content: center;
    text-transform: capitalize;
    text-align: left;
  }
`;

const MenuBody = styled.div`
  margin-top: 2.1875rem;

  ul li a {
    cursor: pointer;
    display: block;
    background: ${({ theme }) => theme.colors.darkGray};
    padding: 1rem 1rem 1rem 1.875rem;
    border-top-left-radius: .625rem;
    border-bottom: .125rem solid ${({ theme }) => theme.colors.mediumGray};
    border-bottom-left-radius: .625rem;
    border-bottom-right-radius: .625rem;
    text-transform: uppercase;
  }

  ul li a:hover {
    background-color: ${({ theme }) => theme.colors.deepTeal};
    border-color: ${({ theme }) => theme.colors.deepTeal};
  }

  .active {
    background-color: ${({ theme }) => theme.colors.darkGreen}!important;
    border-right: .4375rem solid ${({ theme }) => theme.colors.primaryGreen}!important;
    border: none;
  }

  .dropdown__item {
    display: flex;
    justify-content: space-between;
    gap: .375rem;
  }

  .dropdown__item div {
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .dropdown {
    display: none;
  }

  .dropdown__active {
    display: block;
  }

  .menu-config {
    padding-left: 3rem;
  }
`;

export default function Sidebar() {
  const [menuActive, setMenuActive] = useRecoilState(stateMenuActive);
  const [submenuActive, setSubmenuActive] = useState('');
  const navigate = useNavigate();
  const userDate = useRecoilValue(stateUserDate);

  const handleLogout = () => {
    removeCookieData();
    navigate('/');
  }
  
  return (
    <ContainerSidebar $menuActive={menuActive}>
      <span onClick={() => setMenuActive(!menuActive)}>X</span>

      <MenuHeader>
        <button onClick={handleLogout}>
          <i className="fas fa-external-link-alt" aria-hidden="true"></i> Sair
        </button>
        <div className="user-info">
          <p>ID: {userDate.idUsuario}</p>
          <p>DOC: {userDate.cpf}</p>
          <p>{userDate.usuario}</p>
        </div>
      </MenuHeader>

      <MenuBody>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              {link.subOptions ? (
                <div key={index}>
                  <a className="dropdown__item" onClick={() => setSubmenuActive(index === submenuActive ? '' : index)}>
                    <div>
                      <i className={link.iconClassCategory}></i> {link.text} 
                    </div>
                    <i className={`fa-solid ${submenuActive === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </a>

                  <ul className={`${submenuActive === index ? 'dropdown__active' : 'dropdown'}`}>
                    {link.subOptions.map((subLink, index) => (
                      <li key={index} >
                        <NavLink className="menu-config" to={subLink.href} end onClick={() => setMenuActive(!menuActive)}>
                          <i className={subLink.iconClass}></i> {subLink.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <NavLink to={link.href} end 
                  onClick={() => {
                    setMenuActive(!menuActive);
                    setSubmenuActive('');
                  }}
                >
                  {link.ionIcon ? (
                    <ion-icon name={link.ionIcon} role="img" className="md hydrated"></ion-icon>
                  ) : (
                    <i className={link.iconClass}></i>
                  )}{" "}
                  {link.text}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </MenuBody>
    </ContainerSidebar>
  );
}
