import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import { useSearchModelo } from "src/hooks/modelo/useSearchModelo";
import useCreateVehicle from "src/hooks/veiculos/useCreateVehicle";
import { useSearchStatus } from "src/hooks/veiculos/useSearchStatus";

export default function ModalNew() {
  const { userInfo, setUserInfo, handleCreate } = useCreateVehicle();
  const { modelos } = useSearchModelo();
  const { status } = useSearchStatus();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleCreate}>
      <label htmlFor="ano">
        Ano
        <input
          type="number"
          id="ano"
          placeholder="Ex: 2024"
          value={userInfo.ano || ''}
          onChange={(e) => setUserInfo({ ...userInfo, ano: e.target.value})}
          required
        />
      </label>
    
      <label htmlFor="plate">
        Placa
        <input
          type="text"
          id="plate"
          placeholder="Ex: GHJ1234.."
          value={userInfo.placa || ''}
          onChange={(e) => setUserInfo({...userInfo, placa: e.target.value})}
          required
        />
      </label>

      <label htmlFor="dataAquisicao">
        Data de Aquisição
        <input
          type="date"
          id="dataAquisicao"
          placeholder="Ex: 2024-08-01"
          value={userInfo.dataAquisicao || ''}
          onChange={(e) => setUserInfo({ ...userInfo, dataAquisicao: e.target.value})}
          required
        />
      </label>

      <label htmlFor="distanciaDiaria">
        KM Diário
        <input
          type="number"
          id="distanciaDiaria"
          placeholder="Ex: 200"
          value={userInfo.distanciaDiaria || ''}
          onChange={(e) => setUserInfo({ ...userInfo, distanciaDiaria: e.target.value})}
          required
        />
      </label>

      <label htmlFor="idModelo">
        Modelo
        <select 
          id="idModelo" 
          name="type"
          value={userInfo.idModelo || ''}
          onChange={(e) => setUserInfo({ ...userInfo, idModelo: e.target.value })}
          required
        >
          <option value="">Selecione</option>

          {modelos && modelos.length > 0 &&
            modelos.map((info) => (
              <option key={info.idModelo} value={info.idModelo}>
                {info.modelo}
              </option>
            ))
          }
        </select>
      </label>

      <label htmlFor="idVeiculoStatus">
        Status do Veículo
        <select 
          id="idVeiculoStatus" 
          name="type"
          value={userInfo.idVeiculoStatus || ''}
          onChange={(e) => setUserInfo({ ...userInfo, idVeiculoStatus: e.target.value})}
          required
        >
          <option value="">Selecione</option>

          {status && status.length > 0 &&
            status.map((info) => (
              <option key={info.idVeiculoStatus} value={info.idVeiculoStatus}>
                {info.statusVeiculo}
              </option>
            ))
          }
        </select>
      </label>

      <label htmlFor="vidaUtilKm">
        Vida Útil KM
        <input
          type="number"
          id="vidaUtilKm"
          placeholder="Ex: 10000"
          value={userInfo.vidaUtilKm || ''}
          onChange={(e) => setUserInfo({ ...userInfo, vidaUtilKm: e.target.value})}
          required
        />
      </label>

      <label htmlFor="kmAtual">
        KM Atual
        <input
          type="number"
          id="kmAtual"
          placeholder="Ex: 15000"
          value={userInfo.kmAtual || ''}
          onChange={(e) => setUserInfo({ ...userInfo, kmAtual: e.target.value})}
          required
        />
      </label>

      <label htmlFor="idUsuario">
        ID do Usuário
        <input
          type="number"
          id="idUsuario"
          placeholder="Ex: 10203065478"
          value={userInfo.idUsuario || ''}
          onChange={(e) => setUserInfo({ ...userInfo, idUsuario: e.target.value})}
          required
        />
      </label>

      <button type="submit">Cadastrar</button>
    </ModalForm>
  );
}
