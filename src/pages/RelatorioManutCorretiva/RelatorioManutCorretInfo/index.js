import * as F from "../../../styles/forms";

const RelatorioManutCorretInfo = ({ onUserCreated, veiculo, }) => {
  console.log(veiculo)

  return (
    <F.FormContainer>
      <F.Row>
        <F.FormGroup>
          <label>Modelo:</label>
          <p>{veiculo.modelo}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>Placa:</label>
          <p>{veiculo.placa}</p>
        </F.FormGroup>
        <F.FormGroup>
          <label>KM Atual:</label>
          <p>{veiculo.kmAtual}</p>
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>Data da Manutenção</label>
          <p>{veiculo.dataManutencao}</p>
        </F.FormGroup>

        <F.FormGroup>
          <label>Manutenção Realizada em:</label>
          <p>{veiculo.dataFeitoManutencao}</p>
        </F.FormGroup>

        <F.FormGroup>
          <label>Status Manutenção:</label>
          <p>{veiculo.statusVeiculo}</p>
        </F.FormGroup>
      </F.Row>

      <F.Row>
        <F.FormGroup>
          <label>Descrição da Manutenção</label>
          <p>{veiculo.descricaoManutencao}</p>
        </F.FormGroup>
      </F.Row>

      <F.SubmitButton onClick={() => onUserCreated()}>
        Voltar
      </F.SubmitButton>
    </F.FormContainer>
  );
};

export default RelatorioManutCorretInfo;
