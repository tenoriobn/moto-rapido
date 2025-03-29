import { useRecoilValue } from "recoil";
import { ModalViewInfoContainer } from "src/styles/styledComponents/modalsStyles";
import { stateModalInfo } from "src/store/atom";

export default function ModalView() {
  const modalInfo = useRecoilValue(stateModalInfo);

  console.log(modalInfo)

  return (
    <ModalViewInfoContainer>
      <tbody>
        <tr>
          <td className="maintenance__info-title">ID:</td>
          <td><p name="pedidoID" id="pedidoID">{modalInfo.id}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Placa:</td>
          <td><p name="pedidoID" id="pedidoID">{modalInfo.placa}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Agendamento: </td>
          <td><p name="pedidoData" id="pedidoData">{modalInfo.dataManutencao}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Modelo: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.modelo}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Mecânico: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo?.nomeMecanico}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Tipo Manutenção: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo?.tipoManutencao}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Manut. Finalizada: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo?.dataFeitoManutencao}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Status:</td>
          <td>
          <span 
            className={`status status__${modalInfo.statusVeiculo === "Manutenção" 
              ? "maintenance" : modalInfo.statusVeiculo === "Disponivel"? "inactive" : "active"
            }`}
          >
            {modalInfo.statusVeiculo}
          </span>
          </td>
        </tr>

        <tr>
          <td className="maintenance__info-title">Descrição: </td>
          <td>
            <div className="maintenance__description">
              {modalInfo.descricaoManutencao}
            </div>
          </td>
        </tr>
      </tbody>
    </ModalViewInfoContainer>
  );
}
