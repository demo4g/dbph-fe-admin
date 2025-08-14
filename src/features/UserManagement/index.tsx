import { Helmet } from 'react-helmet';
import CollapseScreen from '~/components/UI/CollapseScreen';
import { DEFAULT_PAGESIZE } from '~/constants';
import useFilter from '~/hooks/useFilter';
import DataTable from './components/DataTable';
import Filter from './components/Filter';
import { useGetUserFilter } from './services';

const initialFilter = {
  page: 1,
  limit: DEFAULT_PAGESIZE,
  sort: {
    createdAt: -1,
  },
};

export interface IUserManagementProps {}

/**
 * @page
 * @description Quản lý người dùng
 * @createdAt 12/08/2025
 */
export default function UserManagement(props: IUserManagementProps) {
  const { filter, pagination, handleClearFilter, handleFilter } = useFilter(initialFilter);

  const { data: { data = [], totalItems } = {}, isLoading } = useGetUserFilter({
    params: filter,
  });

  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>

      <CollapseScreen
        headerContent={<Filter onFilter={handleFilter} onClear={handleClearFilter} />}
      >
        {(activeKey: string | null) => (
          <DataTable
            isLoading={isLoading}
            data={data}
            pagination={pagination(totalItems)}
            scrollY={`calc(100vh - ${activeKey ? '37.4rem' : '29.2rem'})`}
          />
        )}
      </CollapseScreen>
    </>
  );
}
