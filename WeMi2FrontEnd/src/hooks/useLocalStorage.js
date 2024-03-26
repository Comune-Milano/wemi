/** @format */

import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  function getFromLocalStorage() {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }
  const prevLocalStorage = getFromLocalStorage();
  const [storedValue, setStoredValue] = useState(prevLocalStorage);

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
