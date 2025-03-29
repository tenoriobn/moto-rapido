/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFetchApi } from "../api/useFetchApi";

export const useSearchCargo = () => {
  const { fetchData } = useFetchApi();
  const [cargos, setCargos] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetchData(`/pessoas/search/cargo`);
      setCargos(response)

    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return {
    cargos
  };
};
