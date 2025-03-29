/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFetchApi } from "../api/useFetchApi";
import { useSetRecoilState } from "recoil";
import { stateModelInfoTable } from "src/store/atom";

export const useSearchModelo = () => {
  const { fetchData } = useFetchApi();
  const [modelos, setModelos] = useState();
  const setModelInfoTable = useSetRecoilState(stateModelInfoTable)

  const handleSearch = async () => {
    try {
      const response = await fetchData(`/veiculos/modelos/listar`);
      setModelInfoTable(response)
      setModelos(response);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return {
    modelos
  };
};
