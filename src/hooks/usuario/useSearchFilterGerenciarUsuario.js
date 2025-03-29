import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchApi } from "../api/useFetchApi";
import { stateUsersTableInfo } from "src/store/atom.js";

export const useSearchFilterGerenciarUsuario = () => {
  const [userId, setUserId] = useState('');
  const { data, error, loading, fetchData } = useFetchApi();
  const setPersonsTableInfo = useSetRecoilState(stateUsersTableInfo);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const endpoint = `/usuarios/search/idpessoa/${userId}`;

    try {
      const response = await fetchData(endpoint);

      console.log(response)
      setPersonsTableInfo(response);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return {
    userId,
    setUserId,
    handleSearch,
    loading,
    error,
    data
  };
};
