import { useRecoilValue, useSetRecoilState } from "recoil";
import { Table } from "src/styles/styledComponents/tableStyle";
import { statePersonsTableInfo } from "src/store/atom.js";
import { stateOpenModal, stateModalInfo } from "src/store/atom";

export default function TableGerenciarPessoa() {
  const personsTableInfo = useRecoilValue(statePersonsTableInfo);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const setModalInfo = useSetRecoilState(stateModalInfo);

  return (
    <>
      {personsTableInfo.length > 0 &&
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th> 
            </tr>
          </thead>
          <tbody>

            {personsTableInfo.map((info) => (
              <tr key={info.idPessoa}>
                <td>{info.idPessoa}</td>
                <td>{info.nome}</td>
                <td>
                  <span 
                    className={`status status__${info.cargo === "Mecânico" 
                      ? "maintenance" : info.cargo === "Não Informado" ? "inactive" : "active"
                    }`}
                  >
                    {info.cargo}
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
