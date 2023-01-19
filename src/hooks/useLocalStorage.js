import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initValue) => {
  function getLocalValue() {
    const localValue = localStorage.getItem(key)
    return localValue ? JSON.parse(localValue) : initValue
  }

  const [value, setValue] = useState(getLocalValue())

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}