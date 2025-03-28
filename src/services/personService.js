import api from "./api";

export const searchPersonName = async (personData) => {
  try {
    const response = await api.get(`/pessoas/search/nome/like/${personData}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar pessoas:" + error.message);
  }
};

export const searchPersonMecanico = async (personData) => {
  try {
    const response = await api.get(
      `/pessoas/search/mecanico/like/${personData}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar mecânico:" + error.message);
  }
};

export const searchPersonCpf = async (personData) => {
  try {
    const response = await api.get(`/pessoas/search/cpf/like/${personData}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar pessoas:" + error.message);
  }
};

export const searchPessoaIdPessoa = async (idPessoa) => {
  try {
    const response = await api.get(`/pessoas/search/idpessoa/${idPessoa}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar usuario:" + error.message);
  }
};

export const searchCargo = async () => {
  try {
    const response = await api.get("/pessoas/search/cargo");

    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar modelos de veículo:" + error.message);
  }
};

export const createPerson = async (personData) => {
  try {
    const response = await api.post("/pessoas/create", personData);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Erro ao cadastrar pessoa. status " + response.status);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePerson = async (personData) => {
  try {
    const response = await api.put("/pessoas/update", personData);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Erro ao atualizar pessoa. status " + response.status);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
