import { toast } from "react-toastify";
import { usePutApi } from "../api/usePutApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateModalInfo, stateOpenModal } from "src/store/atom";

function useCompleteManutencaoCorretiva() {
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const modalInfo = useRecoilValue(stateModalInfo);
  const { putData } = usePutApi(true);

  const handleComplete = async (e) => {
    e.preventDefault();
    try {
      await putData('/manutencao/corretiva/baixar', modalInfo);
      toast.success('Cadastrado com sucesso!');

      setOpenModal(false)

    } catch (error) {
      console.log(error)
      toast.error('Erro ao enviar dados');
    }
  };

  return {
    handleComplete,
  };
}

export default useCompleteManutencaoCorretiva;
