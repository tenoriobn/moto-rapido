import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import { useUpdateVehicle } from "src/hooks/veiculos/useUpdateVehicle";

export default function ModalEdit() {
  const { userInfo, setUserInfo, handleEdit } = useUpdateVehicle();
  
  return (
    <ModalForm id="frmAddPack" onSubmit={handleEdit}>
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
          <option value="2">Manutenção</option>
          <option value="3">Em rota</option>
          <option value="4">Disponível</option>
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

      <button type="submit">Editar</button>
    </ModalForm>
  );
}
