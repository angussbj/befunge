import { useCallback, useState } from "react";

export function useLocalStorageState<T>({
  storageKey,
  initialValue,
}: {
  storageKey: string;
  initialValue: T;
}): [T, (newValue: T) => void] {
  const [value, setValueState] = useState<T>((): T => {
    const storedString = localStorage.getItem(storageKey);
    if (storedString === null) return initialValue;
    return JSON.parse(storedString);
  });

  const setValue = useCallback((newValue: T) => {
    setValueState(newValue);
    localStorage.setItem(storageKey, JSON.stringify(newValue));
  }, []);

  return [value, setValue];
}
