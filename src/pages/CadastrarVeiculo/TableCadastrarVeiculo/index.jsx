import { useRecoilValue, useSetRecoilState } from "recoil";
import { Table } from "src/styles/styledComponents/tableStyle";
import { stateVehicleInfoTable } from "src/store/atom.js";
import { formatDateToBRL } from "src/utils/formatDateToBRL";
import { stateOpenModal, stateModalInfo } from "src/store/atom";

export default function TableCadastrarVeiculo() {
  const vehicleInfoTable = useRecoilValue(stateVehicleInfoTable);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const setModalInfo = useSetRecoilState(stateModalInfo);

  return (
    <>
      {vehicleInfoTable.length > 0 &&
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Placa</th>
              <th>Data de Aquisição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {vehicleInfoTable.map((info, index) => (
              <tr key={info.idVeiculo}>
                <td>{index + 1}</td>
                <td>{info.idVeiculo}</td>
                <td>{info.modelo}</td>
                <td>{info.ano}</td>
                <td>{info.placa}</td>
                <td>{formatDateToBRL(info.dataAquisicao)}</td>
                <td>
                  <span 
                    className={`status status__${info.statusVeiculo === "Manutenção" 
                      ? "maintenance" : info.statusVeiculo === "Disponivel"? "inactive" : "active"
                    }`}
                  >
                    {info.statusVeiculo}
                  </span>
                </td>
                <td>
                  <div className="button__container">
                    <button 
                      onClick={() => {
                        setOpenModal('view')
                        setModalInfo(info)
                      }}
                      className="button button__view"
                    >
                      <i className="fas fa-eye"></i> Ver
                    </button>

                    <button 
                      onClick={() => {
                        setOpenModal('edit')
                        setModalInfo(info)
                      }}
                      className="button button__edit"
                    >
                      <i className="fas fa-edit"></i> Editar
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
