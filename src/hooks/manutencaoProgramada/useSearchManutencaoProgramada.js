import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchApi } from "../api/useFetchApi";
import { stateScheduledMaintenanceInfoTable } from "src/store/atom.js";

export const useSearchManutencaoProgramada = () => {
  const [filtro, setFiltro] = useState({});
  const { data, error, loading, fetchData } = useFetchApi();
  const setScheduledMaintenanceInfoTable = useSetRecoilState(stateScheduledMaintenanceInfoTable);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const searchOptions = filtro.searchOption === "plate" ? "placa" : "modelo";
    const endpoint = `/manutencao/programada/search/${searchOptions}/${filtro.vehicleIdentifier}`;

    try {
      const response = await fetchData(endpoint);
      setScheduledMaintenanceInfoTable(response);
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
