/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFetchApi } from "../api/useFetchApi";

export const useSearchStatus = () => {
  const { fetchData } = useFetchApi();
  const [status, setStatus] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetchData('/veiculos/status/listar');
      setStatus(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return {
    status
  };
};
