import { useRecoilValue } from "recoil";
import { ModalViewInfoContainer } from "src/styles/styledComponents/modalsStyles";
import { stateModalInfo } from "src/store/atom";

export default function ModalView() {
  const modalInfo = useRecoilValue(stateModalInfo);

  return (
    <ModalViewInfoContainer>
      <tbody>
        <tr>
          <td className="maintenance__info-title">ID:</td>
          <td><p name="pedidoID" id="pedidoID">{modalInfo.idPessoa}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">Nome:</td>
          <td><p name="pedidoID" id="pedidoID">{modalInfo.nome}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">RG: </td>
          <td><p name="pedidoData" id="pedidoData">{modalInfo.rg}</p></td>
        </tr>
        <tr>
          <td className="maintenance__info-title">CPF: </td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{modalInfo.cpf}</p></td>
        </tr>

        <tr>
          <td className="maintenance__info-title">Cargo:</td>
          <td>
            <span 
              className={`status status__${modalInfo.cargo === "Mecânico" 
                ? "maintenance" : modalInfo.cargo === "Não Informado" ? "inactive" : "active"
              }`}
            >
              {modalInfo.cargo}
            </span>
          </td>
        </tr>
      </tbody>
    </ModalViewInfoContainer>
  );
}
