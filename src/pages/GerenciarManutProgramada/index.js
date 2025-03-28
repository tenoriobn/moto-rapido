import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import CadastrarManutProgramadaForm from "../CadastrarManutProgramadaForm/index.js";
import ConsultarVeiculo from "../ConsultarVeiculo/index.js";

const GerenciarManutProgramada = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarManutencaoProgramadaForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Gerenciar Manutenção Programada</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "cadastrarManutencaoProgramadaForm" && (
        <CadastrarManutProgramadaForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default GerenciarManutProgramada;
