// UserContext.js
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, idUsuario }) => {
  return (
    <UserContext.Provider value={idUsuario}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
