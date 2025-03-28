import { useEffect, useState } from "react";
import { searchNomeModelo } from "../../services/veiculoService";
import * as C from "../../styles/consulta";

const ConsultarModeloVeiculo = ({ onSelectModeloVeiculo, onGoToCadastrar }) => {
  const [valorConsultado, setValorConsultado] = useState("");
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultaModeloError, setConsultaModeloError] = useState("");
  const [consultaRealizada, setConsultaRealizada] = useState(false); // Controle para saber se já foi feita uma consulta

  useEffect(() => {
    const fetchModelo = async () => {
      if (valorConsultado.length >= 2) {
        setLoading(true);
        setConsultaRealizada(true); // Indica que a consulta foi feita
        try {
          const resultado = await searchNomeModelo(valorConsultado);
          setModelos(resultado);
        } catch (error) {
          setConsultaModeloError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setModelos([]);
        setConsultaRealizada(false); // Reseta o estado quando o campo de consulta é apagado
      }
    };

    if (valorConsultado.length === 0) {
      setModelos([]);
      setConsultaRealizada(false);
    } else if (valorConsultado.length >= 2) {
      fetchModelo();
    }
  }, [valorConsultado]);

  return (
    <C.Container>
      <C.Input
        type="text"
        placeholder="Digite o modelo da moto"
        value={valorConsultado}
        onChange={(e) => setValorConsultado(e.target.value.toUpperCase())}
      />
      {consultaModeloError && (
        <C.ErrorMessage>{consultaModeloError}</C.ErrorMessage>
      )}
      {loading && <p>Carregando ...</p>}
      <C.List>
        {modelos.length > 0 && (
          <C.ListItemCab>
            <p>Modelo Veículo</p>
          </C.ListItemCab>
        )}
        {modelos.map((modelo) => (
          <C.ListItem
            key={modelo.idModelo}
            onClick={() => onSelectModeloVeiculo(modelo)}
          >
            <p>{modelo.modelo}</p>
            <p>{modelo.idModelo}</p>
          </C.ListItem>
        ))}

        {/* Exibe mensagem de "Nenhum modelo localizado" apenas após a consulta */}
        {modelos.length === 0 && consultaRealizada && !loading && (
          <C.ListItem onClick={() => onGoToCadastrar(valorConsultado)}>
            <p>
              Nenhum Modelo localizado. Clique aqui para cadastrar,
              <b>{valorConsultado} </b>.
            </p>
          </C.ListItem>
        )}
      </C.List>
    </C.Container>
  );
};

export default ConsultarModeloVeiculo;
