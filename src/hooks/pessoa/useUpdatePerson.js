import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateModalInfo, stateOpenModal } from "src/store/atom";
import { usePutApi } from "../api/usePutApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useUpdatePerson = () => {
  const modalInfo = useRecoilValue(stateModalInfo);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const { putData } = usePutApi(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo(modalInfo);
  }, [modalInfo]);

  const handleEdit = async (event) => {
    event.preventDefault();
    
    try {
      await putData('/pessoas/update', userInfo);
      toast.success('Atualizado com sucesso!');
      setOpenModal(false);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error('Erro ao tentar atualizar!');
    }
  };

  return { userInfo, setUserInfo, handleEdit };
};

export default useUpdatePerson;
