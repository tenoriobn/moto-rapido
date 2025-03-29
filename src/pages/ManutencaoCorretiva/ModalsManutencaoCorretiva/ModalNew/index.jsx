import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useCreateManutencaoCorretiva from "src/hooks/manutencaoCorretiva/useCreateManutencaoCorretiva";

export default function ModalNew() {
  const {
    vehiclePlate,
    setVehiclePlate,
    newMaintenanceInfo,
    setNewMaintenanceInfo,
    handleCreate,
  } = useCreateManutencaoCorretiva();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleCreate}>
      <label htmlFor="vehicle_plate">
        ID Mecânico
        <input
          type="text"
          id="vehicle_plate"
          placeholder="Ex: 8"
          value={newMaintenanceInfo.idMecanico  || ''}
          onChange={(e) => setNewMaintenanceInfo({ ...newMaintenanceInfo, idMecanico: e.target.value})}
          required
        />
      </label>

      <label htmlFor="vehicle_plate">
        Placa do Veículo
        <input
          type="text"
          id="vehicle_plate"
          placeholder="Ex: GHJ1234"
          value={vehiclePlate || ''}
          onChange={(e) => setVehiclePlate(e.target.value)}
          required
        />
      </label>

      <label htmlFor="appointment_date">
        Data de agendamento
        <input
          type="date"
          id="appointment_date"
          placeholder="Ex: 01/01/2024"
          value={newMaintenanceInfo.dataManutencao || ''}
          onChange={(e) => setNewMaintenanceInfo({ ...newMaintenanceInfo, dataManutencao: e.target.value})}
          required
        />
      </label>

      <label htmlFor="maintenance_description">
        Descrição
        <input
          type="text"
          id="maintenance_description"
          placeholder="Ex: Troca de óleo e vela..."
          value={newMaintenanceInfo.descricaoManutencao || ''}
          onChange={(e) => setNewMaintenanceInfo({ ...newMaintenanceInfo, descricaoManutencao: e.target.value})}
          required
        />
      </label>

      <button type="submit">Cadastrar</button>
    </ModalForm>
  );
}
