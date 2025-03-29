import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchApi } from "../api/useFetchApi";
import { statePersonsTableInfo } from "src/store/atom.js";

export const useSearchPerson = () => {
  const [filter, setFilter] = useState({});
  const setPersonsTableInfo = useSetRecoilState(statePersonsTableInfo);
  const { data, error, loading, fetchData } = useFetchApi();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const searchOptions = filter.searchOption === "name" ? "nome" : "cpf";
    const endpoint = `/pessoas/search/${searchOptions}/like/${filter.identifier}`;

    try {
      const response = await fetchData(endpoint);
      setPersonsTableInfo(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return {
    filter,
    setFilter,
    handleSearch,
    loading,
    error,
    data
  };
};
