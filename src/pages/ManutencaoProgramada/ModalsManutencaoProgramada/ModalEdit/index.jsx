import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useUpdateManutencaoProgramada from "src/hooks/manutencaoProgramada/useUpdateManutencaoProgramada";

export default function ModalEdit() {
  const { modalInfo, setModalInfo, handleEdit } = useUpdateManutencaoProgramada();
  return (
    <ModalForm id="frmAddPack" onSubmit={handleEdit}>
      <label htmlFor="appointment_date">
        Data de agendamento
        <input
          type="date"
          id="appointment_date"
          placeholder="Ex: 01/01/2024"
          value={modalInfo.dataManutencao || ''}
          onChange={(e) => setModalInfo({ ...modalInfo, dataManutencao: e.target.value})}
          required
        />
      </label>

      <label htmlFor="km_maintenance">
        Km Manutenção
        <input
          type="number"
          id="km_maintenance"
          placeholder="Ex: 127659"
          value={modalInfo.kmManutencao || ''}
          onChange={(e) => setModalInfo({ ...modalInfo, kmManutencao: e.target.value})}
          required
        />
      </label>

      <label htmlFor="maintenance_description">
        Descrição
        <input
          type="text"
          id="maintenance_description"
          placeholder="Ex: Troca de óleo e vela..."
          value={modalInfo.descricaoManutencao || ''}
          onChange={(e) => setModalInfo({ ...modalInfo, descricaoManutencao: e.target.value})}
          required
        />
      </label>

      <button type="submit">Atualizar</button>
    </ModalForm>
  );
}
