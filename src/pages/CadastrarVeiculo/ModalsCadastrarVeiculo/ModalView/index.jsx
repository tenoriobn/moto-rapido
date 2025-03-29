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
          <td><p name="pedidoID" id="pedidoID">{modalInfo.idVeiculo}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Modelo: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.modelo}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Modelo: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.ano}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Placa:</td>
          <td><p name="pedidoID" id="pedidoID">{modalInfo.placa}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Data Aquisição: </td>
          <td><p name="pedidoData" id="pedidoData">{modalInfo.dataAquisicao}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">KM Atual: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.kmAtual}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Vida Útil KM: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.vidaUtilKm}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">KM Diário: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.distanciaDiaria}</p></td>
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
        </tr>
      </tbody>
    </ModalViewInfoContainer>
  );
}
