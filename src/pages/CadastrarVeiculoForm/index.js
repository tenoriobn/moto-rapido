import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import {
  atualizarVeiculo,
  cadastrarVeiculo,
  searchModelos,
  searchStatusVeiculo,
} from "../../services/veiculoService";
import * as F from "./../../styles/forms";

const CadastrarVeiculoForm = ({
  showPopupMessage,
  onFormSubmitted,
  veiculo,
  placa,
  onUserCreated,
}) => {
  const [modelos, setModelos] = useState([]);
  const [veiculoStatusList, setVeiculoStatusList] = useState([]);
  const idUsuario = useUser(); // Acessando o idUsuario do contexto

  // Inicializa NewVeiculo com base na presença do veiculo
  const [NewVeiculo, setNewVeiculo] = useState({
    idVeiculo: veiculo ? veiculo.idVeiculo : null,
    ano: veiculo ? veiculo.ano : "",
    placa: veiculo ? veiculo.placa : placa && placa.trim() !== "" ? placa : "", // Inicializa com a placa se fornecida
    dataAquisicao: veiculo ? veiculo.dataAquisicao : "",
    distanciaDiaria: veiculo ? veiculo.distanciaDiaria : "",
    idModelo: veiculo ? veiculo.idModelo : "",
    idVeiculoStatus: veiculo ? veiculo.idVeiculoStatus : "",
    idUsuario: idUsuario,
    vidaUtilKm: veiculo ? veiculo.vidaUtilKm : "",
    kmAtual: veiculo ? veiculo.kmAtual : "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca modelos e status de veículo
        const modelosResponse = await searchModelos();
        const statusResponse = await searchStatusVeiculo();

        setModelos(modelosResponse);
        setVeiculoStatusList(statusResponse);
      } catch (error) {
        showPopupMessage(
          "Erro",
          "Erro ao carregar dados de modelos ou status",
          "error"
        );
      }
    };

    fetchData();
  }, [showPopupMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVeiculo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (veiculo) {
        // Se estiver editando, chama a função de atualização
        await atualizarVeiculo(NewVeiculo);
        showPopupMessage(
          "Sucesso",
          "Veículo atualizado com sucesso!",
          "success"
        );
      } else {
        // Caso contrário, chama a função de cadastro
        await cadastrarVeiculo(NewVeiculo);
        showPopupMessage(
          "Sucesso",
          "Veículo cadastrado com sucesso!",
          "success"
        );
      }
      // Limpa o formulário após o cadastro
      setNewVeiculo({
        idVeiculo: null,
        ano: "",
        placa: "",
        dataAquisicao: "",
        distanciaDiaria: "",
        idModelo: "",
        idVeiculoStatus: "",
        idUsuario: idUsuario,
        vidaUtilKm: "",
        kmAtual: "",
      });
      if (onUserCreated) onUserCreated(); // Chama a função de callback para redirecionar ou executar outra ação
    } catch (error) {
      showPopupMessage("Erro", "Erro ao salvar veículo", "error");
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Row>
        <F.FormGroup>
          <label>Placa:</label>
          <input
            type="text"
            name="placa"
            value={NewVeiculo.placa}
            onChange={handleInputChange}
            required
            disabled={!!veiculo} // Desabilita o campo de placa em modo de edição
          />
        </F.FormGroup>
        <F.FormGroup>
          <label>Ano:</label>
          <input
            type="number"
            name="ano"
            value={NewVeiculo.ano}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
        <F.FormGroup>
          <label>Data de Aquisição:</label>
          <input
            type="date"
            name="dataAquisicao"
            value={NewVeiculo.dataAquisicao}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <select
            name="idModelo"
            value={NewVeiculo.idModelo}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o Modelo</option>
            {modelos.map((modelo) => (
              <option key={modelo.idModelo} value={modelo.idModelo}>
                {modelo.modelo}
              </option>
            ))}
          </select>
        </F.FormGroup>
        <F.FormGroup>
          <label>Status do Veículo:</label>
          <select
            name="idVeiculoStatus"
            value={NewVeiculo.idVeiculoStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o Status</option>
            {veiculoStatusList.map((status) => (
              <option
                key={status.idVeiculoStatus}
                value={status.idVeiculoStatus}
              >
                {status.statusVeiculo}
              </option>
            ))}
          </select>
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>KM Atual:</label>
          <input
            type="number"
            name="kmAtual"
            value={NewVeiculo.kmAtual}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
        <F.FormGroup>
          <label>Vida Útil (km):</label>
          <input
            type="number"
            name="vidaUtilKm"
            value={NewVeiculo.vidaUtilKm}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
        <F.FormGroup>
          <label>Distância Diária (km):</label>
          <input
            type="number"
            name="distanciaDiaria"
            value={NewVeiculo.distanciaDiaria}
            onChange={handleInputChange}
            required
          />
        </F.FormGroup>
      </F.Row>

      <F.SubmitButton type="submit">
        {veiculo ? "Atualizar Veículo" : "Cadastrar Veículo"}
      </F.SubmitButton>
    </F.FormContainer>
  );
};

export default CadastrarVeiculoForm;
