import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useCreatePerson from "src/hooks/pessoa/useCreatePerson";
import { useSearchCargo } from "src/hooks/pessoa/useSearchCargo";

export default function ModalNew() {
  const { userInfo, setUserInfo, handleCreate } = useCreatePerson();
  const { cargos } = useSearchCargo();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleCreate}>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          id="name"
          placeholder="Ex: José Aprecido..."
          value={userInfo.nome || ''}
          onChange={(e) => setUserInfo({...userInfo, nome: e.target.value})}
          required
        />
      </label>

      <label htmlFor="rg">
        RG
        <input
          type="text"
          id="rg"
          placeholder="Ex: 898735"
          value={userInfo.rg || ''}
          onChange={(e) => setUserInfo({ ...userInfo, rg: e.target.value})}
          required
        />
      </label>

      <label htmlFor="cpf">
        CPF
        <input
          type="text"
          id="cpf"
          placeholder="Ex: 48678978985"
          value={userInfo.cpf || ''}
          onChange={(e) => setUserInfo({ ...userInfo, cpf: e.target.value})}
          required
        />
      </label>

      <label htmlFor="cargo">
        Cargo
        <select 
          id="cargo" 
          name="type"
          value={userInfo.idCargo || ''}
          onChange={(e) => setUserInfo({ ...userInfo, idCargo: e.target.value})}
          required
        >
          <option value="">Selecione</option>
          {cargos && cargos.map((info, index) => (
            <option key={index} value={info.idCargo}>{info.cargo}</option>
          ))}
        </select>
      </label>

      <button type="submit">Cadastrar</button>
    </ModalForm>
  );
}
