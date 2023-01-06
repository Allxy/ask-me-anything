import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): [T, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(timeout);
      setIsPending(true);
    };
  }, [value, delay]);

  return [debouncedValue, isPending];
};

export default useDebounce;
