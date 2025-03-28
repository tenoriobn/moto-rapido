import api from "./api.js";

export const cadastrarManutencaoProgramada = async (manutProgData) => {
  try {
    const response = await api.post(
      "manutencao/programada/cadastrar",
      manutProgData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar Manutenção programada:", error);
  }
};

export const searchManutProgIdVeiculo = async (idVeiculo) => {
  try {
    const response = await api.get(
      `manutencao/programada/search/idveiculo/${idVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao buscar manutenção progrmada pelo id veiculo:",
      error
    );
  }
};

export const baixarManutencaoProgramada = async (manutProgData) => {
  try {
    const response = await api.put(
      "/manutencao/programada/baixar",
      manutProgData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const cadastrarManutencaoCorretiva = async (manutCorretivaData) => {
  try {
    const response = await api.post(
      "manutencao/corretiva/cadastrar",
      manutCorretivaData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar Manutenção Corretiva:", error);
  }
};

export const searchManutCorretivaIdVeiculo = async (idVeiculo) => {
  try {
    const response = await api.get(
      `manutencao/corretiva/search/idveiculo/${idVeiculo}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Erro ao buscar manutenção corretiva pelo id veiculo:",
      error
    );
  }
};

export const baixarManutencaoCorretiva = async (manutCorretData) => {
  try {
    const response = await api.put(
      "/manutencao/corretiva/baixar",
      manutCorretData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const listarManutProgramadaVeiculo = async (manutProgData) => {
  const veiculoID = manutProgData.veiculoID;
  const dataInicial = manutProgData?.inicial || "2024-01-01";
  const dataFinal = manutProgData?.final || "2024-12-31";
  try {
    const response = await api.get(
      `/manutencao/programada/search/idveiculo/periodo/${veiculoID}/${dataInicial}/${dataFinal}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const listarManutProgramadaPorPeriodo = async (manutProgDate) => {
  const dataInicial = manutProgDate?.inicial || "2024-01-01";
  const dataFinal = manutProgDate?.final || "2024-12-31";

  try {
    const response = await api.get(
      `/manutencao/programada/search/periodo/${dataInicial}/${dataFinal}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const listarManutCorretivaVeiculo = async (manutProgData) => {
  const veiculoID = manutProgData.veiculoID;
  const dataInicial = manutProgData?.inicial || "2024-01-01";
  const dataFinal = manutProgData?.final || "2024-12-31";
  try {
    const response = await api.get(
      `/manutencao/corretiva/search/idveiculo/periodo/${veiculoID}/${dataInicial}/${dataFinal}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

export const listarManutCorretivaPorPeriodo = async (manutProgDate) => {
  const dataInicial = manutProgDate?.inicial || "2024-01-01";
  const dataFinal = manutProgDate?.final || "2024-12-31";

  try {
    const response = await api.get(
      `/manutencao/corretiva/search/periodo/${dataInicial}/${dataFinal}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar modelos de veículo:", error);
  }
};

