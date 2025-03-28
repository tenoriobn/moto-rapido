/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { searchVeiculoPlaca } from "../../../services/veiculoService";
import * as C from "../../../styles/consulta";
import { listarManutProgramadaPorPeriodo, listarManutProgramadaVeiculo } from "../../../services/manutencaoService";
import { Table } from "../../../styles/table";

const ConsultarRelatorioManutProgramada = ({ showPopupMessage, onGoToCadastrar, onSelectVeiculo, }) => {
  const [valorConsultado, setValorConsultado] = useState({ placa: "", inicio: "", final: "" });
  const [manutencoesProgramadas, setManutencoesProgramadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaVeiculoError, setConsultaVeiculoError] = useState("");

  // Função para listar manutenções por período
  const fetchRelatorioPorPeriodo = async () => {
    setLoading(true);
    try {
      const resultado = await listarManutProgramadaPorPeriodo({
        inicial: valorConsultado.inicio,
        final: valorConsultado.final
      });
      setManutencoesProgramadas(resultado);
    } catch (error) {
      setConsultaVeiculoError(error.message);
      showPopupMessage("Erro", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Função para listar manutenções de um veículo específico por período
  const fetchRelatorioPorVeiculo = async () => {
    setLoading(true);
    try {
      const veiculoID = await fetchVeiculoID();
      if (veiculoID) {
        const resultado = await listarManutProgramadaVeiculo({
          veiculoID,
          inicial: valorConsultado.inicio,
          final: valorConsultado.final
        });
        setManutencoesProgramadas(resultado);
      } else {
        setManutencoesProgramadas([]);
      }
    } catch (error) {
      setConsultaVeiculoError(error.message);
      showPopupMessage("Erro", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar ID do veículo pela placa
  const fetchVeiculoID = async () => {
    try {
      const resposta = await searchVeiculoPlaca(valorConsultado.placa);
      return resposta.length === 1 ? resposta[0].idVeiculo : null;
    } catch (error) {
      console.log("Erro ao buscar veículo:", error);
      return null;
    }
  };

  // Executa a busca inicial e define quando chamar as funções de busca
  useEffect(() => {
    // Condições para chamadas de API
    if (valorConsultado.placa && valorConsultado.placa.length > 6) {
      fetchRelatorioPorVeiculo(); // Busca por veículo
    } else if (valorConsultado.inicio && valorConsultado.final) {
      fetchRelatorioPorPeriodo(); // Busca apenas por período
    } else {
      fetchRelatorioPorPeriodo(); // Busca padrão anual ao carregar
    }
  }, [valorConsultado]);

  return (
    <C.Container>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <C.Input
          type="text"
          placeholder="Digite a Placa"
          value={valorConsultado.placa}
          onChange={(e) => setValorConsultado({ ...valorConsultado, placa: e.target.value.toUpperCase() })}
        />

        <C.Input
          type="date"
          value={valorConsultado.inicio}
          style={{ maxWidth: "124px" }}
          onChange={(e) => setValorConsultado({ ...valorConsultado, inicio: e.target.value })}
        />

        <C.Input
          type="date"
          value={valorConsultado.final}
          style={{ maxWidth: "124px" }}
          onChange={(e) => setValorConsultado({ ...valorConsultado, final: e.target.value })}
        />
      </div>

      {consultaVeiculoError && <C.ErrorMessage>{consultaVeiculoError}</C.ErrorMessage>}
      {loading && <p>Carregando ...</p>}
      {manutencoesProgramadas.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {manutencoesProgramadas.map((manut) => (
              <tr onClick={() => onSelectVeiculo(manut)} className="info" key={manut.id}>
                <td>{manut.id}</td>
                <td>{manut.modelo}</td>
                <td>{manut.placa}</td>
                <td>{manut.dataManutencao}</td>
                <td>{manut.dataFeitoManutencao || 'N.A'}</td>
                <td>{manut.statusVeiculo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && onGoToCadastrar && (
          <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
            <p>Nenhuma Manutenção Programada no momento para <b>{valorConsultado.placa || "este período"}</b>.</p>
          </C.ListItem>
        )
      )}
    </C.Container>
  );
};

export default ConsultarRelatorioManutProgramada;
