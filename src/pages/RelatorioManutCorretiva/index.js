import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import ConsultarRelatorioManutCorretiva from "./ConsultarRelatorioManutCorretiva/index.js";
import RelatorioManutCorretInfo from "./RelatorioManutCorretInfo/index.js";

const RelatorioManutCorretiva = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("relatorioManutCorretInfo");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Relatório Manutenção Corretiva</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarRelatorioManutCorretiva
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "relatorioManutCorretInfo" && (
        <RelatorioManutCorretInfo
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default RelatorioManutCorretiva;
