import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initValue) => {
  function getLocalValue() {
    const localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : typeof initValue === 'function' ? initValue() : initValue;
  }

  const [value, setValue] = useState(getLocalValue());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
