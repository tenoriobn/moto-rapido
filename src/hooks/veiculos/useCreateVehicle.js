import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { usePostApi } from "src/hooks/api/usePostApi";
import { stateOpenModal } from "src/store/atom";

function useCreateVehicle() {
  const [userInfo, setUserInfo] = useState('');
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const { postData } = usePostApi(true);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await postData('/veiculos/cadastrar', userInfo);
      toast.success('Cadastrado com sucesso!');

      setOpenModal(false)

    } catch (error) {
      if (error.message === 'Veículo não encontrado!') {
        toast.error(error.message);
      } else {
        console.error("Erro ao enviar dados:", error);
        toast.error('Erro ao enviar dados');
      }
    }
  };

  return {
    userInfo,
    setUserInfo,
    handleCreate,
  };
}

export default useCreateVehicle;
