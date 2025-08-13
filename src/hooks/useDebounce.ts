import { useRef } from 'react';
import { useCallback } from 'react';

const useDebounce = (delay = 500) => {
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    (callback: () => void, overideDelay?: number) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(callback, overideDelay || delay);
    },
    [delay]
  );
};

export default useDebounce;
