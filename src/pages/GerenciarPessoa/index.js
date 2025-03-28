import React, { useState } from "react";
import * as C from "../../styles/gerenciar";
import CadastrarPessoa from "../CadastrarPessoa";
import ConsultarPessoa from "../ConsultarPessoa";

const GerenciarPessoa = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarPessoa");
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [cpfToRegister, setCpfToRegister] = useState("");

  const handlePessoaSelected = (pessoa) => {
    setSelectedPessoa(pessoa);
    setActivePage("cadastrarPessoa");
  };

  const handleGoToCadastrar = (cpf) => {
    setCpfToRegister(cpf);
    setActivePage("cadastrarPessoa");
  };

  return (
    <C.Container>
      <C.Title>Gerenciar Pessoa</C.Title>
      {activePage === "consultarPessoa" && (
        <ConsultarPessoa
          onSelectPessoa={handlePessoaSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "cadastrarPessoa" && (
        <CadastrarPessoa
          pessoa={selectedPessoa}
          cpf={cpfToRegister}
          onUserCreated={() => setActivePage("consultarPessoa")}
          showPopupMessage={showPopupMessage}
        />
      )}
    </C.Container>
  );
};

export default GerenciarPessoa;
