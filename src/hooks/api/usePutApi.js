import { useState } from 'react';
import { apiClient } from 'src/http/http';

export const usePutApi = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async (rota, dados) => {
    setLoading(true);
    try {
      const response = await apiClient.put(rota, dados);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { putData, error, loading };
};
