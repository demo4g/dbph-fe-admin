import { useState } from 'react';
import SimplePagination, { ISimplePaginationProps } from '~/components/UI/SimplePagination';

interface IUseSimplePaginationProps {
  limit: number;
  data: any[];
  paginationProps?: ISimplePaginationProps;
}

const useSimplePagination = ({ limit, data, paginationProps }: IUseSimplePaginationProps) => {
  const [page, setPage] = useState(1);

  const total = data.length;
  const startIndex = (page - 1) * limit;
  const remainingData = data.slice((page - 1) * limit, page * limit);

  return {
    page,
    startIndex,
    remainingData,
    SimplePaginationComponent: (
      <SimplePagination
        total={total}
        page={page}
        limit={limit}
        onChange={setPage}
        {...paginationProps}
      />
    ),
  };
};

export default useSimplePagination;
