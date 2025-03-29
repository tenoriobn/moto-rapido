import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateOpenModal } from "src/store/atom";
import useOutsideClick from "src/hooks/modal/useOutsideClick";
import { Transition } from "src/styles/styledComponents/transitionsStyles";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
  width: 100%;
  height: 100%;
  z-index: 99;

  .modal-content {
    border-radius: .375rem;
    background-color: ${({ theme }) => theme.colors.mediumGray};
    margin: 0 1rem;
    max-width: 350px;
    width: 100%;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: .0625rem solid ${({ theme }) => theme.colors.deepGray};
    background-color: ${({ theme }) => theme.colors.deepGray};
    position: relative;
    padding: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .close-button {
    border: none;
    border-radius: .375rem;
    background-color: ${({ theme }) => theme.colors.red};
    box-sizing: border-box;
    cursor: pointer;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white};
    padding: .75rem 1rem;
    ${Transition}
  }

  .close-button:hover {
    opacity: .8;
  }

  .body-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
`;

export default function Modal({ title, children, openModal, maxWidth }) {
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const modalRef = useRef(null);
  useOutsideClick(modalRef, openModal, setOpenModal);

  return (
    openModal && (
      <ModalContainer>
        <div className="modal-content" style={maxWidth} ref={modalRef}>
          <div className="modal-header">
            <h2 id="modalTitulo">{title}</h2>

            <button className="close-button" onClick={() => setOpenModal(null)}>
              <i className="fa fa-times"></i>
            </button>
          </div>

          <div className="modal-body">
            <div className="body-container">
              {children}
            </div>
          </div>
        </div>
      </ModalContainer>
    )
  );
}
