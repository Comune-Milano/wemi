/** @format */

import { useState } from 'react';

export default function useSessionStorage(key, initialValue) {
  function getFromSessionStorage() {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }
  const prevSessionStorage = getFromSessionStorage();
  const [storedValue, setStoredValue] = useState(prevSessionStorage);

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
