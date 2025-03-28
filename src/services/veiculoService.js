import api from "./api.js";

export const searchVeiculoModelo = async (nomeModeloVeiculo) => {
  try {
    const response = await api.get(
      `veiculos/search/modelo/${nomeModeloVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar veiculo:", error);
  }
};

export const searchVeiculoPlaca = async (placaloVeiculo) => {
  try {
    const response = await api.get(
      `veiculos/search/placaveiculo/${placaloVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar veiculo:", error);
  }
};

export const searchModelos = async () => {
  try {
    const response = await api.get("/veiculos/modelos/listar");

    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar modelos de veículo:", error);
  }
};

export const cadastrarModelo = async (modeloVeiculo) => {
  try {
    const response = await api.post("/veiculos/inserir/modelo", modeloVeiculo);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const atualizarModelo = async (modeloVeiculo) => {
  try {
    const response = await api.put("/veiculos/update/tbmodelo", modeloVeiculo);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const searchStatusVeiculo = async () => {
  try {
    const response = await api.get("/veiculos/status/listar");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar status de veículo:", error);
  }
};

export const cadastrarVeiculo = async (veiculoData) => {
  try {
    const response = await api.post("/veiculos/cadastrar", veiculoData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar veículo:", error);
  }
};

export const atualizarVeiculo = async (veiculoData) => {
  try {
    const response = await api.put("/veiculos/atualizar", veiculoData);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar veículo:", error);
  }
};

export const searchNomeModelo = async (nomeModelo) => {
  try {
    const response = await api.get(`veiculos/search/nomemodelo/${nomeModelo}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar nome modelo:", error);
  }
};

export const listarStatusVeiculos = async () => {

  try {
    const response = await api.get(`veiculos/status/listar`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const listarStatusVeiculosPorPeriodo = async (idStatus) => {
  try {
    const response = await api.get(`/veiculos/search/veiculostatus/status/${idStatus}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

