import { useRecoilValue, useSetRecoilState } from "recoil";
import { Table } from "src/styles/styledComponents/tableStyle";
import { stateCorrectiveMaintenanceInfoTable } from "src/store/atom.js";
import { formatDateToBRL } from "src/utils/formatDateToBRL";
import { stateOpenModal, stateModalInfo } from "src/store/atom";

export default function TableManutencaoCorretiva() {
  const correctiveMaintenanceInfoTable = useRecoilValue(stateCorrectiveMaintenanceInfoTable);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const setModalInfo = useSetRecoilState(stateModalInfo);

  return (
    <>
      {correctiveMaintenanceInfoTable.length > 0 &&
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Agendamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {correctiveMaintenanceInfoTable.map((maintenance) => (
              <tr key={maintenance.id}>
                <td>{maintenance.id}</td>
                <td>{maintenance.modelo}</td>
                <td>{maintenance.placa}</td>
                <td>{maintenance.dataManutencao && formatDateToBRL(maintenance.dataManutencao)}</td>
                <td>
                  <span 
                    className={`status status__${maintenance.statusVeiculo === "Manutenção" 
                      ? "maintenance" : maintenance.statusVeiculo === "Disponivel"? "inactive" : "active"
                    }`}
                  >
                    {maintenance.statusVeiculo}
                  </span>
                </td>
                <td>
                  <div className="button__container">
                    <button 
                      onClick={() => {
                        setOpenModal('view')
                        setModalInfo(maintenance)
                      }}
                      className="button button__view"
                    >
                      <i className="fas fa-eye"></i> Ver
                    </button>

                    <button 
                      onClick={() => {
                        setOpenModal('edit')
                        setModalInfo(maintenance)
                      }}
                      className="button button__delete"
                    >
                      Finalizar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </>
  )
}
