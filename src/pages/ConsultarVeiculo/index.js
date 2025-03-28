import { useEffect, useState } from "react";
import {
  searchVeiculoModelo,
  searchVeiculoPlaca,
} from "../../services/veiculoService";
import * as C from "../../styles/consulta";
import { isPlaca, verificarPlaca } from "../../utils/placaUtils";

const ConsultarVeiculo = ({
  showPopupMessage,
  onSelectVeiculo,
  onGoToCadastrar,
}) => {
  const [valorConsultado, setValorConsultado] = useState("");
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaVeiculoError, setConsultaVeiculoError] = useState("");

  useEffect(() => {
    const fetchVeiculo = async () => {
      if (valorConsultado.length >= 2) {
        setLoading(true);
        try {
          let resultado;

          if (isPlaca(valorConsultado)) {
            resultado = await searchVeiculoPlaca(valorConsultado); // Busca pela placa
          } else {
            resultado = await searchVeiculoModelo(valorConsultado); // Busca pelo modelo
          }
          setVeiculos(resultado); // Atualiza o estado com os veículos retornados
        } catch (error) {
          setConsultaVeiculoError(error.message);
          showPopupMessage("Erro", error.message, "error");
        } finally {
          setLoading(false);
        }
      } else {
        setVeiculos([]); // Corrigido para limpar o array quando a busca não for válida
      }
    };
    // Se o valorConsultado for apagado ou tiver menos de 2 caracteres, limpa a lista
    if (valorConsultado.length === 0) {
      setVeiculos([]); // Limpa a lista de veículos se o campo input estiver vazio
    } else if (valorConsultado.length > 2) {
      fetchVeiculo(); // Faz a busca apenas quando há mais de 2 caracteres
    }
  }, [showPopupMessage, valorConsultado]);

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o modelo da moto ou placa"
        value={valorConsultado}
        onChange={(e) => setValorConsultado(e.target.value.toUpperCase())}
      ></C.Input>
      {consultaVeiculoError && (
        <C.ErrorMessage>{consultaVeiculoError}</C.ErrorMessage>
      )}
      {loading && <p>Carregando ...</p>}
      <C.List>
        {veiculos.length > 0 && (
          <C.ListItemCab>
            <p>Veículo</p>
            <p>Placa</p>
          </C.ListItemCab>
        )}
        {veiculos.map((veiculo) => (
          <C.ListItem
            key={veiculo.idVeiculo}
            onClick={() => onSelectVeiculo(veiculo)}
          >
            <p>{veiculo.modelo}</p>
            <p>{veiculo.placa}</p>
          </C.ListItem>
        ))}
        {veiculos.length === 0 &&
          !loading &&
          onGoToCadastrar &&
          verificarPlaca(valorConsultado) && (
            <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
              <p>
                Nenhuma moto localizada. Clique aqui para cadastrar
                <b>{valorConsultado}</b>.
              </p>
            </C.ListItem>
          )}
      </C.List>
    </C.Container>
  );
};

export default ConsultarVeiculo;
