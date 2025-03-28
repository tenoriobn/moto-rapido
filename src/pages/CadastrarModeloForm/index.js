import React, { useState, useEffect } from "react";
import * as F from "./../../styles/forms";
import {
  atualizarModelo,
  cadastrarModelo,
} from "../../services/veiculoService";

const CadastrarModeloForm = ({
  showPopupMessage,
  onFormSubmitted,
  modelo,
  modeloParaCadastrar, // Valor inserido na consulta
  onUserCreated,
}) => {
  const [NewModelo, setNewModelo] = useState({
    idModelo: modelo ? modelo.idModelo : null,
    modelo: modelo ? modelo.modelo : modeloParaCadastrar || "",
  });

  // Aqui, habilitamos o campo se for edição, e desabilitamos para cadastro
  const [isDisabled, setIsDisabled] = useState(!modelo); // Desabilitado se não for edição

  useEffect(() => {
    if (!modelo) {
      // Se não for edição, o valor da consulta é usado e o campo fica desabilitado
      setNewModelo((prev) => ({
        ...prev,
        modelo: modeloParaCadastrar,
      }));
      setIsDisabled(true); // Desabilita para novos cadastros
    } else {
      // Se for edição, habilita o campo para edição
      setIsDisabled(false);
    }
  }, [modeloParaCadastrar, modelo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModelo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modelo) {
        // Se estiver editando, chama a função de atualização
        await atualizarModelo(NewModelo);
        showPopupMessage(
          "Sucesso",
          "Modelo atualizado com sucesso!",
          "success"
        );
      } else {
        // Caso contrário, chama a função de cadastro
        await cadastrarModelo(NewModelo);
        showPopupMessage(
          "Sucesso",
          "Modelo cadastrado com sucesso!",
          "success"
        );
      }
      // Limpa o formulário após o cadastro
      setNewModelo({
        idModelo: null,
        modelo: "",
      });
      if (onUserCreated) onUserCreated(); // Chama a função de callback para redirecionar ou executar outra ação
    } catch (error) {
      showPopupMessage("Erro", "Erro ao salvar veículo", "error");
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={NewModelo.modelo}
            onChange={handleInputChange}
            required
            disabled={isDisabled} // Habilita/desabilita o campo conforme a situação
          />
        </F.FormGroup>
      </F.Row>

      <F.SubmitButton type="submit">
        {modelo ? "Atualizar Modelo" : "Cadastrar Modelo"}
      </F.SubmitButton>
    </F.FormContainer>
  );
};

export default CadastrarModeloForm;
