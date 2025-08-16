import { useEffect, useState } from 'react';
import { IBaseFilter } from '~/types';

/** Dùng cho app Quản trị Game */
const useFilter = <T extends IBaseFilter = IBaseFilter>(initialFilter: T) => {
  const [filter, setFilter] = useState<T>(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const handleFilter = (values: any) => {
    setFilter((prevState) => ({ ...initialFilter, limit: prevState.limit, ...values }));
  };

  const handleFilterV2 = (values: any) => {
    setFilter((prevState) => ({ ...initialFilter, limit: prevState.limit, filter: { ...values } }));
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

  return { filter, setFilter, handleClearFilter, handleFilter, handleFilterV2, pagination };
};

export default useFilter;
