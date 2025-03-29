import { useState } from 'react';
import Cookies from 'js-cookie';
import { apiClient } from 'src/http/http';

export const usePostApi = ( incluirToken = false) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const postData = async (rota, dados) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      if (incluirToken) {
        const token = Cookies.get('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await apiClient.post(rota, dados, config);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, error, loading };
};
