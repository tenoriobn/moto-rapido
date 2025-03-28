import { useState } from "react";
import * as C from "../../styles/gerenciar";
import ConsultarModeloVeiculo from "../ConsultarModeloVeiculo";
import CadastrarModeloForm from "../CadastrarModeloForm";

const CadastrarModelo = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarModeloVeiculo");
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [modeloParaCadastrar, setModeloParaCadastrar] = useState("");

  const handleModeloSelected = (modelo) => {
    setSelectedModelo(modelo);
    setActivePage("CadastrarModeloForm");
  };

  const handleFormSubmitted = () => {
    setActivePage("consultarModeloVeiculo");
  };

  const handleGoToCadastrar = (valorConsultado) => {
    setSelectedModelo(null); // Garantindo que está cadastrando um novo modelo
    setModeloParaCadastrar(valorConsultado); // Definindo o valor inserido na consulta
    setActivePage("CadastrarModeloForm");
  };

  return (
    <C.Container>
      <C.Title>Cadastrar Modelo de Veículo</C.Title>
      {activePage === "consultarModeloVeiculo" && (
        <ConsultarModeloVeiculo
          showPopupMessage={showPopupMessage}
          onSelectModeloVeiculo={handleModeloSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "CadastrarModeloForm" && (
        <CadastrarModeloForm
          showPopupMessage={showPopupMessage}
          onFormSubmitted={handleFormSubmitted}
          modelo={selectedModelo}
          modeloParaCadastrar={modeloParaCadastrar} // Passa o valor da consulta
          onUserCreated={() => setActivePage("consultarModeloVeiculo")}
        />
      )}
    </C.Container>
  );
};

export default CadastrarModelo;
