import { useEffect, useState } from 'react';
import { IBaseFilter } from '~/types';

const useFilter = <T extends IBaseFilter = IBaseFilter>(initialFilter: T) => {
  const [filter, setFilter] = useState<T>(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const handleFilter = (values: Partial<T>) => {
    setFilter((prevState) => ({ ...initialFilter, limit: prevState.limit, ...values }));
  };

  const handleClearFilter = () => {
    setFilter((prevState) => ({ ...initialFilter, limit: prevState.limit }));
  };

  const pagination = (totalRecords?: number) => ({
    pageIndex: filter.page,
    pageSize: filter.limit,
    total: totalRecords,
    onChange: (page: number, pageSize: number) => {
      setFilter((prevState: T) => ({
        ...prevState,
        page: page,
        limit: pageSize,
      }));
    },
  });

  return { filter, setFilter, handleClearFilter, handleFilter, pagination };
};

export default useFilter;
