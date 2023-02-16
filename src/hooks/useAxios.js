import { useCallback, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { authAPI } from '../api';

const instance = axios.create({
  baseURL: process.env.VITE_SERVER_URL,
  withCredentials: true
});

export const useAxios = () => {
  const { token, setToken } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshToken = useCallback(
    async (config, cb) => {
      const response = await instance.request({
        method: 'POST',
        url: authAPI.refresh
      });
      if (response?.data?.accessToken) {
        setToken({ accessToken: response.data.accessToken });
        try {
          const newConfig = {
            ...config,
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`
            }
          };
          const result = await instance.request(newConfig);
          if (result?.data && cb) {
            cb(result.data);
          }
        } catch (e) {
          setError(e?.response?.data || e);
        }
      }
    },
    [setToken]
  );

  const sendRequest = useCallback(
    async (config, cb) => {
      setError(null);
      setIsLoading(true);

      try {
        if (token?.accessToken) {
          config.headers = {
            Authorization: `Bearer ${token.accessToken}`
          };
        }
        const result = await instance.request(config);
        if (result?.data && cb) {
          cb(result.data);
        }
      } catch (e) {
        e?.response?.status === 403 ? refreshToken(config, cb) : setError(e?.response?.data || e);
      } finally {
        setIsLoading(false);
      }
    },
    [token, refreshToken]
  );

  return { error, isLoading, sendRequest };
};
