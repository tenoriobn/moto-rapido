import React, { useEffect, useState } from "react";

import {
  createPerson,
  searchCargo,
  updatePerson,
} from "../../services/personService";
import * as C from "../../styles/forms";

const CadastrarPessoa = ({ pessoa, cpf, onUserCreated, showPopupMessage }) => {
  const [cargos, setCargos] = useState([]);
  const [action, setAction] = useState(""); // Estado para armazenar a ação
  const [newPerson, setNewPerson] = useState({
    nome: pessoa ? pessoa.nome : "",
    cpf: pessoa ? pessoa.cpf : cpf && cpf.trim() !== "" ? cpf : "",
    rg: pessoa ? pessoa.rg : "",
    idPessoa: pessoa ? pessoa.idPessoa : null,
    cargo: pessoa ? pessoa.cargo : "",
    idCargo: pessoa ? pessoa.idCargo : null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (pessoa) {
        setAction("atualizar");
      } else if (cpf) {
        setAction("cadastrar");
      }
      try {
        // Busca modelos e status de veículo
        const cargosResponse = await searchCargo();

        setCargos(cargosResponse);
      } catch (error) {
        showPopupMessage("Erro", "Erro ao carregar dados dos cargos", "error");
      }
    };

    fetchData();
  }, [showPopupMessage, pessoa, cpf]);

  // Lógica para determinar o texto do botão e a ação
  let buttonText;
  let tituloForm = "";

  if (pessoa) {
    tituloForm = "Editar Dados Pessoa";
    buttonText = "Editar Pessoa";
  } else if (cpf) {
    // Não há pessoa, somente CPF informado, cadastra-se uma nova e pessoa
    tituloForm = "Cadastrar Dados Pessoa";
    buttonText = "Cadastrar Pessoa";
  }

  const handlePersonAction = async (e) => {
    e.preventDefault();
    try {
      if (action === "cadastrar") {
        await createPerson(newPerson); // funcao para gerar usuario quando a
        showPopupMessage(
          "Gerenciar Usuario",
          "Pessoa cadastrada com sucesso!",
          "success"
        );

        if (onUserCreated) onUserCreated();
      } else if (action === "atualizar") {
        await updatePerson(newPerson); // função para resetar senha
        //alert("Senha resetada com sucesso!");
        showPopupMessage(
          "Gerenciar Usuario",
          "Dados atualizados com sucesso!",
          "success"
        );
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      //alert("Erro ao processar a ação de senha: " + error.message);
      showPopupMessage("Gerenciar Usuario", "Erro ." + error.message, "error");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <C.FormContainer onSubmit={handlePersonAction}>
      <C.Title>{tituloForm}</C.Title>
      <C.Row>
        <C.FormGroup>
          <label>Nome:</label>
          <C.Input
            type="text"
            placeholder="Nome"
            value={newPerson.nome}
            onChange={(e) =>
              setNewPerson({ ...newPerson, nome: e.target.value.toUpperCase() })
            }
            required
          />
        </C.FormGroup>
        <C.FormGroup>
          <label>Cargo:</label>
          <select
            name="idCargo"
            value={newPerson.idCargo || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o Cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo.idCargo} value={cargo.idCargo}>
                {cargo.cargo}
              </option>
            ))}
          </select>
        </C.FormGroup>
      </C.Row>
      <C.Row>
        <C.FormGroup>
          <label>CPF:</label>
          <C.Input
            type="text"
            placeholder="CPF"
            value={newPerson.cpf}
            onChange={(e) =>
              setNewPerson({ ...newPerson, cpf: e.target.value.toUpperCase() })
            }
            required
            readOnly={true}
          />
        </C.FormGroup>
        <C.FormGroup>
          <label>Rg:</label>
          <C.Input
            type="text"
            placeholder="RG"
            value={newPerson.rg}
            onChange={(e) =>
              setNewPerson({ ...newPerson, rg: e.target.value.toUpperCase() })
            }
            required
          />
        </C.FormGroup>
      </C.Row>

      <C.Row>
        <C.SubmitButton type="submit">{buttonText}</C.SubmitButton>
      </C.Row>
    </C.FormContainer>
  );
};

export default CadastrarPessoa;
