import api from "./api";

export const searchUsuarioIdPessoa = async (idPessoa) => {
  try {
    const response = await api.get(`/usuarios/search/idpessoa/${idPessoa}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuario:", error);
  }
};

export const createPesrsoAndUser = async (userData) => {
  try {
    const response = await api.post("/usuarios/create", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar usuário. Tente novamente.");
  }
};

export const generateUserAndPassword = async (idPessoa) => {
  try {
    const response = await api.post("/usuarios/create/idpessoa", {
      idPessoa: idPessoa,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro ao gerar usuario.");
    }
  } catch (error) {
    throw new Error("Erro ao gerar usuário e senha. Tente novamente.");
  }
};

export const resetPassword = async (idPessoa) => {
  try {
    const response = await api.post("/usuarios/resetpassword", {
      idPessoa: idPessoa,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro ao resetar a senha do usuario.");
    }
  } catch (error) {
    throw new Error("Erro ao resetar a senha. Tente novamente.");
  }
};
