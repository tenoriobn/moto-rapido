import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null); // Estado para o idUsuario

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStored = localStorage.getItem("user");
    if (token && userStored) {
      setUser(JSON.parse(userStored));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const signin = async (login, senha) => {
    try {
      const response = await api.post("/usuarios/authenticate", { login, senha });
      const { usuario, cpf, token, idUsuario } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ usuario, cpf}));
      //api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ usuario, cpf });
      setIdUsuario(idUsuario);
      return "";
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status que não é 2xx
        console.error("Erro no servidor:", error.response.data); // Imprime o erro do servidor no console
        return error.response?.data?.message || "Login ou senha incorretos";
      } else if (error.request) {
        // O request foi feito, mas não houve resposta
        console.error("Erro de conexão. O servidor não está respondendo:", error.request); // Imprime o erro de request no console
        return "Erro de conexão. O servidor não está respondendo no momento.";
      } else {
        // Um erro foi gerado ao configurar o request
        console.error("Erro inesperado:", error.message); // Imprime qualquer outro erro no console
        return "Ocorreu um erro inesperado. Tente novamente.";
      }
    }
  };

  const signout = async () => {
    try {
      console.log("Token enviado no logout:", api.defaults.headers.Authorization);
      await api.post("/usuarios/logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
    setUser(null);
    setIdUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.Authorization = undefined;
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, idUsuario, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
