import { useState } from 'react';
import { apiClient } from 'src/http/http';

export const useDeleteApi = (rota, token) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.delete(rota, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, error, loading };
};
