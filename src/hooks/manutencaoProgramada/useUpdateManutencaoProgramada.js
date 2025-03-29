import { useRecoilState, useSetRecoilState } from "recoil";
import { stateModalInfo, stateOpenModal } from "src/store/atom";
import { usePutApi } from "../api/usePutApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const useUpdateManutencaoProgramada = () => {
  const [modalInfo, setModalInfo] = useRecoilState(stateModalInfo);
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const { putData } = usePutApi(true);

  useEffect(() => {
    console.log('modalInfo: ', modalInfo)
  }, [modalInfo])

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      await putData('/manutencao/programada/atualizar', modalInfo);
      toast.success('Atualizado com sucesso!');
      setOpenModal(false);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error('Erro ao tentar atualizar!');
    }
  };

  return { modalInfo, setModalInfo, handleEdit };
};

export default useUpdateManutencaoProgramada;
