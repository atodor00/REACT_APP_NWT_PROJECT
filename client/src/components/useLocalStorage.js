import { useEffect } from "react";
import { useState } from "react";

function getSavedValue(k, initV) {
  const savedValue = JSON.parse(localStorage.getItem(k));
  if (savedValue) {
    return savedValue;
  } else {
    return initV;
  }
}

export default function useLocalStorage(k, initV) {
  let [value, setValue] = useState(() => {
    return getSavedValue(k, initV);
  });
  useEffect(() => {
    localStorage.setItem(k, JSON.stringify(value));
  });

  return [value, setValue];
}
