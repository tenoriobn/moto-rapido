import React, { useState } from "react";
import * as C from "../../styles/gerenciar";
import CadastrarUsuario from "../CadastrarUsuario";
import ConsultarPessoa from "../ConsultarPessoa";

const GerenciarUsuario = ({ showPopupMessage }) => {
  const [activePage, setActivePage] = useState("consultarPessoa");
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [cpfToRegister, setCpfToRegister] = useState("");

  const handlePessoaSelected = (pessoa) => {
    setSelectedPessoa(pessoa);
    setActivePage("cadastrarUsuario");
  };

  const handleGoToCadastrar = (cpf) => {
    setCpfToRegister(cpf);
    setActivePage("cadastrarUsuario");
  };

  return (
    <C.Container>
      <C.Title>Gerenciar Usuario</C.Title>
      {activePage === "consultarPessoa" && (
        <ConsultarPessoa
          onSelectPessoa={handlePessoaSelected}
          onGoToCadastrar={handleGoToCadastrar}
        />
      )}
      {activePage === "cadastrarUsuario" && (
        <CadastrarUsuario
          pessoa={selectedPessoa}
          cpf={cpfToRegister}
          onUserCreated={() => setActivePage("consultarPessoa")}
          showPopupMessage={showPopupMessage}
        />
      )}
    </C.Container>
  );
};

export default GerenciarUsuario;
