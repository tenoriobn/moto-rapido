import * as C from "../../styles/gerenciar.js";
import ConsultarRelatorioStatusVeiculo from "./ConsultarRelatorioStatusVeiculo/index.js";

const RelatorioStatusVeiculo = ({ showPopupMessage }) => {

  return (
    <C.Container>
      <C.Title>Relatório de Status dos Veículos</C.Title>

      <ConsultarRelatorioStatusVeiculo
        showPopupMessage={showPopupMessage}
      />
    </C.Container>
  );
};

export default RelatorioStatusVeiculo;
