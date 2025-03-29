import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usePostApi } from "src/hooks/api/usePostApi";
import { stateOpenModal, stateUserDate } from "src/store/atom";
import useSearchIDVehicle from "../veiculos/useSearchIDVehicle";

function useCreateManutencaoCorretiva() {
  const userData = useRecoilValue(stateUserDate);
  console.log(userData.idUsuario);

  const [vehiclePlate, setVehiclePlate] = useState('');
  const [newMaintenanceInfo, setNewMaintenanceInfo] = useState({});
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const { postData } = usePostApi(true);
  const { handleVehicleIdByPlate } = useSearchIDVehicle();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const idVeiculo = await handleVehicleIdByPlate(vehiclePlate);
      
      await postData('/manutencao/corretiva/cadastrar', { 
        ...newMaintenanceInfo, 
        idUsuario: userData.idUsuario,
        idVeiculo,
      });
      toast.success('Cadastrado com sucesso!');

      setOpenModal(false)

    } catch (error) {
      if (error.message !== 'Veículo não encontrado!') {
        console.error("Erro ao enviar dados:", error);
        toast.error('Erro ao enviar dados');
      }
    }
  };

  return {
    vehiclePlate,
    setVehiclePlate,
    newMaintenanceInfo,
    setNewMaintenanceInfo,
    handleCreate,
  };
}

export default useCreateManutencaoCorretiva;
