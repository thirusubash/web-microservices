import { useState } from 'react';
import axiosInstance from 'api/axiosInstance';

const usePost = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(url, payload);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

export default usePost;
