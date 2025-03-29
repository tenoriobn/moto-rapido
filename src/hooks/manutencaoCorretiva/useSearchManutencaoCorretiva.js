import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchApi } from "../api/useFetchApi";
import { stateCorrectiveMaintenanceInfoTable } from "src/store/atom.js";
import useSearchIDVehicle from "../veiculos/useSearchIDVehicle";

export const useSearchManutencaoCorretiva = () => {
  const [filtro, setFiltro] = useState({});
  const { data, error, loading, fetchData } = useFetchApi();
  const { handleVehicleIdByPlate } = useSearchIDVehicle();
  const setCorrectiveMaintenanceInfoTable = useSetRecoilState(stateCorrectiveMaintenanceInfoTable);

  const handleSearch = async (e) => {
    e.preventDefault();

    const idVeiculo = await handleVehicleIdByPlate(filtro.vehicleIdentifier);
    const endpoint = `/manutencao/corretiva/search/idveiculo/${idVeiculo}`;

    try {
      const response = await fetchData(endpoint);
      setCorrectiveMaintenanceInfoTable(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return {
    filtro,
    setFiltro,
    handleSearch,
    loading,
    error,
    data
  };
};
