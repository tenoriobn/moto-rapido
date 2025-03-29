import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useUpdateUser from "src/hooks/usuario/useUpdateUser";

export default function ModalEdit() {
  const { userInfo, setUserInfo, handleEdit } = useUpdateUser();
  
  return (
    <ModalForm id="frmAddPack" onSubmit={handleEdit}>
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

      <button type="submit">Editar</button>
    </ModalForm>
  );
}
