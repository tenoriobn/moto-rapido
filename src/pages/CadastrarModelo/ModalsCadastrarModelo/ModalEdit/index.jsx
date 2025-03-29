import { ModalForm } from "src/styles/styledComponents/modalsStyles";
import useUpdateModelo from "src/hooks/modelo/useUpdateModelo";

export default function ModalEdit() {
  const { userInfo, setUserInfo, handleEdit } = useUpdateModelo();

  return (
    <ModalForm id="frmAddPack" onSubmit={handleEdit}>
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
