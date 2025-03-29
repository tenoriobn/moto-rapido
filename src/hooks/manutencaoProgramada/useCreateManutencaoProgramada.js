import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { usePostApi } from "src/hooks/api/usePostApi";
import { stateOpenModal } from "src/store/atom";
import useSearchIDVehicle from "../veiculos/useSearchIDVehicle";

function useCreateManutencaoProgramada() {
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [newMaintenanceInfo, setNewMaintenanceInfo] = useState({});
  const setOpenModal = useSetRecoilState(stateOpenModal);
  const { postData } = usePostApi(true);
  const { handleVehicleIdByPlate } = useSearchIDVehicle();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const idVeiculo = await handleVehicleIdByPlate(vehiclePlate);
      await postData('/manutencao/programada/cadastrar', { ...newMaintenanceInfo, idVeiculo });
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

export default useCreateManutencaoProgramada;
