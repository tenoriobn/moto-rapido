import { useRecoilState } from "recoil";
import useCompleteManutencaoCorretiva from "src/hooks/manutencaoCorretiva/useCompleteManutencaoCorretiva";
import { stateModalInfo } from "src/store/atom";
import { ModalForm } from "src/styles/styledComponents/modalsStyles";

export default function ModalEdit() {
  const [modalInfo, setModalInfo] = useRecoilState(stateModalInfo);
  const { handleComplete } = useCompleteManutencaoCorretiva();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleComplete}>
      <label htmlFor="appointment_date">
        Data de Finalização
        <input
          type="date"
          id="appointment_date"
          placeholder="Ex: 01/01/2024"
          value={modalInfo.dataFeitoManutencao || ''}
          onChange={(e) => setModalInfo({...modalInfo, dataFeitoManutencao: e.target.value })}
          required
        />
      </label>

      <button type="submit">Finalizar</button>
    </ModalForm>
  );
}
