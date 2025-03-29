import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useCreateModelo from "src/hooks/modelo/useCreateModelo";

export default function ModalNew() {
  const { userInfo, setUserInfo, handleCreate } = useCreateModelo();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleCreate}>
      <label htmlFor="vehicle_model">
        Modelo do Veículo
        <input
          type="text"
          id="vehicle_model"
          placeholder="Ex: YAMAHA MT-07"
          value={userInfo.modelo || ''}
          onChange={(e) => setUserInfo({ modelo: e.target.value})}
          required
        />
      </label>

      <button type="submit">Cadastrar</button>
    </ModalForm>
  );
}
