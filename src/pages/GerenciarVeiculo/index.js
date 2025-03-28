import { useState } from "react";
import * as C from "../../styles/gerenciar";
import CadastrarVeiculoForm from "../CadastrarVeiculoForm";
import ConsultarVeiculo from "../ConsultarVeiculo";

const CadastrarVeiculo = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarVeiculo");
  const [selectedVeiculo, setSelectedVeiculo] = useState(null);
  const [selectedPlaca, setSelectedPlaca] = useState("");

  const handleVeiculoSelected = (veiculo) => {
    setSelectedVeiculo(veiculo);
    setActivePage("cadastrarVeiculoForm");
  };

  const handleGoToCadastrar = (placa) => {
    setSelectedPlaca(placa);
    setActivePage("cadastrarVeiculoForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarVeiculo");
  };

  return (
    <C.Container>
      <C.Title>Cadastrar Veículo</C.Title>
      {activePage === "consultarVeiculo" && (
        <ConsultarVeiculo
          showPopupMessage={showPopupMessage}
          onSelectVeiculo={handleVeiculoSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "cadastrarVeiculoForm" && (
        <CadastrarVeiculoForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          veiculo={selectedVeiculo}
          placa={selectedPlaca}
          onUserCreated={() => setActivePage("consultarVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default CadastrarVeiculo;
