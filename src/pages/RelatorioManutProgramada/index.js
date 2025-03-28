import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import ConsultarRelatorioManutProgramada from "./ConsultarRelatorioManutProgramada/index.js";
import RelatorioManutProgamInfo from "./RelatorioManutProgamInfo/index.js";

const RelatorioManutProgramada = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("relatorioManutProgamInfo");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Relatório Manutenção Programada</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarRelatorioManutProgramada
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "relatorioManutProgamInfo" && (
        <RelatorioManutProgamInfo
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default RelatorioManutProgramada;
