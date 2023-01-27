import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VITE_SERVER_URL,
})

export const useAxios = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async(config, cb) => {
    setError(null)
    setIsLoading(true)
    try {
      const result = await instance.request(config)
      if (result?.data) {
        cb(result.data)
      }
    } catch (e) {
      setError(e?.response?.data || e)
    } finally {
      setIsLoading(false)
    }
  })

  return { error, isLoading, sendRequest }
}