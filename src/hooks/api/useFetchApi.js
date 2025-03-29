import { useState } from 'react';
import { apiClient } from 'src/http/http';

export const useFetchApi = (token, options = {}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (rota) => {
    try {
      const response = await apiClient.get(rota, {
        headers: { Authorization: `Bearer ${token}` },
        ...options,
      });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, error, loading };
};
