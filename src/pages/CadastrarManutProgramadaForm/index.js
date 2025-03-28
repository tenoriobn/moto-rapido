import { useCallback, useEffect, useState } from "react";
import {
  baixarManutencaoProgramada,
  cadastrarManutencaoProgramada,
  searchManutProgIdVeiculo,
} from "../../services/manutencaoService";
import * as F from "../../styles/forms";
import * as P from "../../styles/popapform";

const InputField = ({ label, type, value, onChange, required }) => (
  <P.PopupFormGroup>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} required={required} />
  </P.PopupFormGroup>
);

const CadastrarManutProgramadaForm = ({
  showPopupMessage,
  onUserCreated,
  veiculo,
}) => {
  const [newManutencao, setNewManutencao] = useState({
    id: null,
    idVeiculo: veiculo ? veiculo.idVeiculo : null,
    dataManutencao: "",
    kmManutencao: "",
    placa: veiculo ? veiculo.placa : "",
    kmAtual: veiculo ? veiculo.kmAtual : "",
    modelo: veiculo ? veiculo.modelo : "",
    descricaoManutencao: "",
  });

  const [manutencoes, setManutencoes] = useState([]);
  const [showBaixarPopup, setShowBaixarPopup] = useState(false);
  const [dataFeitoManutencao, setDataFeitoManutencao] = useState("");
  const [kmFeitoManutencao, setKmFeitoManutencao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch maintenance data for the selected vehicle
  const fetchData = useCallback(async () => {
    if (!veiculo) return;

    try {
      const result = await searchManutProgIdVeiculo(veiculo.idVeiculo);
      setManutencoes(result);
    } catch (error) {
      console.error(error);
      showPopupMessage("Erro", "Erro ao buscar manutenções", "error");
    }
  }, [veiculo, showPopupMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = ({ target: { name, value } }) => {
    setNewManutencao((prevData) => ({
      ...prevData,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  };

  const handleBaixarManutencao = async (manutencao) => {
    const manutencaoData = {
      id: manutencao.id,
      dataFeitoManutencao: dataFeitoManutencao,
      kmFeitoManutencao: kmFeitoManutencao,
    };

    try {
      await baixarManutencaoProgramada(manutencaoData);
      showPopupMessage("Sucesso", "Manutenção baixada com sucesso!", "success");
      setShowBaixarPopup(false);
      fetchData(); // Refresh maintenance list
    } catch (error) {
      console.error(error);
      showPopupMessage("Erro", "Erro ao baixar manutenção", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await cadastrarManutencaoProgramada(newManutencao);
      showPopupMessage(
        "Sucesso",
        "Manutenção agendada com sucesso!",
        "success"
      );
      if (onUserCreated) onUserCreated();
    } catch (error) {
      console.error(error);
      showPopupMessage("Erro", "Erro ao salvar manutenção", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <F.FormContainer onSubmit={handleSubmit}>
      <F.Title>Agendar Manutenção</F.Title>
      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <p>{newManutencao.modelo}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>Placa:</label>
          <p>{newManutencao.placa}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>KM Atual:</label>
          <p>{newManutencao.kmAtual}</p>
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <InputField
          label="Data da Manutenção:"
          type="date"
          name="dataManutencao"
          value={newManutencao.dataManutencao}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="KM para Manutenção:"
          type="number"
          name="kmManutencao"
          value={newManutencao.kmManutencao}
          onChange={handleInputChange}
          required
        />
      </F.Row>

      <F.Row>
        <InputField
          label="Descrição da Manutenção:"
          type="text"
          name="descricaoManutencao"
          value={newManutencao.descricaoManutencao}
          onChange={handleInputChange}
          required
        />
      </F.Row>

      <F.SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar Manutenção"}
      </F.SubmitButton>

      <F.Title>Manutenções Programadas:</F.Title>
      {manutencoes.length > 0 ? (
        <F.StyledList>
          {manutencoes.slice(0, 3).map((manutencao) => (
            <F.ListItem key={manutencao.id}>
              <strong>Data:</strong> {manutencao.dataManutencao}
              <strong> KM:</strong> {manutencao.kmManutencao}
              <strong> Descrição:</strong> {manutencao.descricaoManutencao}
              {!manutencao.manutencaoOk ? (
                <F.SubmitButton
                  type="button"
                  onClick={() => {
                    setShowBaixarPopup(true);
                    setNewManutencao(manutencao);
                  }}
                >
                  Baixar
                </F.SubmitButton>
              ) : (
                <>
                  <strong> Executada em:</strong>
                  {manutencao.dataFeitoManutencao}
                  <strong> KM:</strong>
                  {manutencao.kmFeitoManutencao}
                </>
              )}
            </F.ListItem>
          ))}
        </F.StyledList>
      ) : (
        <p>Não há manutenções agendadas.</p>
      )}

      {showBaixarPopup && (
        <P.Popup>
          <P.PopupContainer>
            <P.PopupTitle>Baixar Manutenção</P.PopupTitle>
            <P.PopupRow>
              <InputField
                label="Data da Manutenção Feita:"
                type="date"
                value={dataFeitoManutencao}
                onChange={(e) => setDataFeitoManutencao(e.target.value)}
                required
              />
              <InputField
                label="KM da Manutenção Feita:"
                type="number"
                value={kmFeitoManutencao}
                onChange={(e) => setKmFeitoManutencao(e.target.value)}
                required
              />
            </P.PopupRow>
            <P.PopupRow>
              <P.PopupFormGroup className="button-group">
                <P.PopupSubmitButton onClick={() => setShowBaixarPopup(false)}>
                  Cancelar
                </P.PopupSubmitButton>
                <P.PopupSubmitButton
                  onClick={() => handleBaixarManutencao(newManutencao)}
                >
                  Confirmar Baixa
                </P.PopupSubmitButton>
              </P.PopupFormGroup>
            </P.PopupRow>
          </P.PopupContainer>
        </P.Popup>
      )}
    </F.FormContainer>
  );
};

export default CadastrarManutProgramadaForm;
