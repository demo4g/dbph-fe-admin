import { useLogger } from '@mantine/hooks';
import { Helmet } from 'react-helmet';
import CollapseScreen from '~/components/UI/CollapseScreen';
import { DEFAULT_PAGESIZE } from '~/constants';
import useFilter from '~/hooks/useFilter';
import DataTable from './components/DataTable';
import Filter from './components/Filter';
import { useGetReportFilter } from './services';

const initialFilter = {
  page: 1,
  limit: DEFAULT_PAGESIZE,
};

export interface IReportManagementProps {}

/**
 * @page
 * @description Quản lý báo cáo
 * @createdAt 12/08/2025
 */
export default function ReportManagement(props: IReportManagementProps) {
  const { filter, pagination, handleClearFilter, handleFilter } = useFilter(initialFilter);

  const {
    data: { data = [], totalItems } = {},
    isLoading,
    refetch,
  } = useGetReportFilter({
    params: filter,
  });

  useLogger('filter', [filter]);

  return (
    <>
      <Helmet>
        <title>Quản lý báo cáo</title>
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
            refetch={refetch}
          />
        )}
      </CollapseScreen>
    </>
  );
}
