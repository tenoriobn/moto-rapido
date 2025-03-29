import { useRecoilValue, useSetRecoilState } from "recoil";
import { Table } from "src/styles/styledComponents/tableStyle";
import { stateModalInfo, stateModelInfoTable, stateOpenModal } from "src/store/atom.js";

export default function TableCadastrarModelo() {
  const modelInfoTable = useRecoilValue(stateModelInfoTable);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const setModalInfo = useSetRecoilState(stateModalInfo);

  return (
    <>
      {modelInfoTable.length > 0 &&
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID Modelo</th>
              <th>Modelo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {modelInfoTable.map((info, index) => (
              <tr key={info.idModelo}>
                <td>{index + 1}</td>
                <td>{info.idModelo}</td>
                <td>{info.modelo}</td>

                <td>
                  <div className="button__container">
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
