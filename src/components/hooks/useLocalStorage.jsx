/* eslint-disable no-unused-vars */
import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredvalue] = useState(() => {
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch(error) {
      return initialValue;
    }
  })

  const setValue = (value) => {
    try{
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredvalue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch(error) {
      console.log('Error saving to local storage: ', error);
    }
  };

  return [storedValue, setValue]
}

export default useLocalStorage