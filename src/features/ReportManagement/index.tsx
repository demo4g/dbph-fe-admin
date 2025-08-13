import { useLogger } from '@mantine/hooks';
import { Helmet } from 'react-helmet';
import CollapseScreen from '~/components/UI/CollapseScreen';
import { DEFAULT_PAGESIZE } from '~/constants';
import useFilter from '~/hooks/useFilter';
import DataTable from './components/DataTable';
import Filter from './components/Filter';

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

  useLogger('filter', [filter]);

  const data: any = Array.from({ length: 10 }, (_, i) => ({
    name: `Báo cáo ${i + 1}`,
    code: `${i + 1}`,
    year: '2025',
    price: Math.floor(Math.random() * 1000000) + 1000000,
    status: '1',
  }));

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
            isLoading={false}
            data={data}
            pagination={pagination(data.length)}
            scrollY={`calc(100vh - ${activeKey ? '37.4rem' : '29.2rem'})`}
            refetch={() => {}}
          />
        )}
      </CollapseScreen>
    </>
  );
}
