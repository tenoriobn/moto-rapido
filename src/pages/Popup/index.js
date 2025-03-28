import React from "react";
import * as C from "../../styles/popap";

const Popup = ({ title, message, type, onClose }) => {
  return (
    <C.PopupOverlay>
      <C.PopupContainer type={type}>
        <C.Title>&#9776; {title}</C.Title>
        <C.PopupMessage type={type}>
          {type === "error"
            ? " \u2717 "
            : type === "alert"
            ? " \u26A0 "
            : " \u2714 "}{" "}
          {message}
        </C.PopupMessage>
        <C.CloseButton onClick={onClose}>X</C.CloseButton>
      </C.PopupContainer>
    </C.PopupOverlay>
  );
};

export default Popup;
