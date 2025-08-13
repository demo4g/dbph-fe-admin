import queryString from 'query-string';
import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const useURLquery = () => {
  const location = useLocation();
  const query = useMemo(() => queryString.parse(location.search), [location.search]);
  const newQueryParameters = useMemo(() => new URLSearchParams(), []);

  const [, setSearchParams] = useSearchParams();

  const setQuery = useCallback(
    (query: object) => {
      for (const [key, value] of Object.entries(query)) {
        if (value) {
          newQueryParameters.set(key, value);
        } else {
          newQueryParameters.delete(key);
        }
      }
      setSearchParams(newQueryParameters, { replace: true });
    },
    [newQueryParameters, setSearchParams]
  );

  const clearQuery = useCallback(() => {
    for (const [key] of Object.entries(query)) {
      newQueryParameters.delete(key);
    }
    setSearchParams(newQueryParameters, { replace: true });
  }, [newQueryParameters, query, setSearchParams]);

  const stringifyQuery = useCallback((query: object) => {
    return queryString.stringify(query, {
      skipEmptyString: true,
      skipNull: true,
    });
  }, []);

  return { query, setQuery, stringifyQuery, clearQuery };
};

export default useURLquery;
