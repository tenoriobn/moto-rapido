import { useState } from "react";
import * as C from "../../styles/gerenciar.js";
import CadastrarManutCorretivaForm from "../CadastrarManutCorretivaForm/index.js";
import ConsultarVeiculo from "../ConsultarVeiculo/index.js";

const GerenciarManutCorretiva = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("CadastrarManutCorretivaForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Gerenciar Manutenção Corretiva</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
        />
      )}
      {activePage === "CadastrarManutCorretivaForm" && (
        <CadastrarManutCorretivaForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default GerenciarManutCorretiva;
