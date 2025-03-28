/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { listarStatusVeiculos, listarStatusVeiculosPorPeriodo } from "../../../services/veiculoService";
import * as C from "../../../styles/consulta";
import { Table } from "../../../styles/table";

const ConsultarRelatorioStatusVeiculo = ({ showPopupMessage, onGoToCadastrar }) => {
  const [statusOptions, setStatusOptions] = useState([]); // Estado para armazenar as opções de status
  const [selectedStatus, setSelectedStatus] = useState(""); // Armazena o ID do status selecionado
  const [statusVeiculo, setStatusVeiculo] = useState([]); // Dados de veículos para exibir na tabela
  const [loading, setLoading] = useState(false);
  const [consultaVeiculoError, setConsultaVeiculoError] = useState("");

  // Função para buscar e listar todos os status de veículos ao carregar o componente
  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const resultado = await listarStatusVeiculos();
        setStatusOptions(resultado);
      } catch (error) {
        setConsultaVeiculoError("Erro ao buscar status de veículos.");
      }
    };

    fetchStatusOptions();
  }, []);

  // Função para buscar veículos por status quando um status é selecionado
  const fetchRelatorioPorStatus = async (idStatus) => {
    setLoading(true);
    try {
      const resultado = await listarStatusVeiculosPorPeriodo(idStatus);
      setStatusVeiculo(resultado);
    } catch (error) {
      setConsultaVeiculoError("Erro ao buscar veículos para o status selecionado.");
      showPopupMessage("Erro", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Manipulador para selecionar o status e chamar a função de busca ou limpar o estado
  const handleStatusChange = (e) => {
    const statusId = e.target.value;
    setSelectedStatus(statusId);

    if (statusId === "") {
      setStatusVeiculo([]); // Limpa os dados de veículos
    } else {
      fetchRelatorioPorStatus(statusId); // Busca veículos para o status selecionado
    }
  };

  return (
    <C.Container>
      {/* Dropdown de status de veículos */}
      <C.Select
        value={selectedStatus}
        onChange={handleStatusChange}
        style={{ maxWidth: "180px" }}
      >
        <option value="">Selecione</option>
        {statusOptions.map((status) => (
          <option key={status.idVeiculoStatus} value={status.idVeiculoStatus}>
            {status.statusVeiculo}
          </option>
        ))}
      </C.Select>
      {consultaVeiculoError && <C.ErrorMessage>{consultaVeiculoError}</C.ErrorMessage>}
      {loading && <p>Carregando ...</p>}

      {statusVeiculo.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {statusVeiculo.map((veiculo, index) => (
              <tr key={index}>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.placa}</td>
                <td>{veiculo.statusVeiculo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && onGoToCadastrar && (
          <C.ListItem onClick={() => onGoToCadastrar({ placa: selectedStatus })}>
            <p>Nenhum veículo encontrado para o status <b>{selectedStatus}</b>.</p>
          </C.ListItem>
        )
      )}
    </C.Container>
  );
};

export default ConsultarRelatorioStatusVeiculo;
