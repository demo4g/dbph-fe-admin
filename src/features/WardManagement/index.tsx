import { Button, Group, Input, Select, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import RowActionsEllipsis from '~/components/UI/Tables/RowActionsEllipsis';
import { IMRT_ColumnDef_Custom } from '~/components/UI/Tables/TableWithPagination';
import TableWithPaginationV2 from '~/components/UI/Tables/TableWithPaginationV2';
import { DEFAULT_PAGESIZE } from '~/constants';
import useDebounce from '~/hooks/useDebounce';
import useFilter from '~/hooks/useFilter';
import useSearchData from '~/hooks/useSearchData';
import { IWard } from './services';
import WardModal from './WardModal';

const initialFilter = {
  page: 1,
  limit: DEFAULT_PAGESIZE,
};

export interface IWardManagementProps {}

/**
 * @page
 * @description Quản lý Phường/Xã
 * @createdAt 12/08/2025
 */
export default function WardManagement(props: IWardManagementProps) {
  const theme = useTheme();
  const debounce = useDebounce();
  const { filter, pagination, handleClearFilter, handleFilter } = useFilter(initialFilter);

  const [opened, modal] = useDisclosure();
  const [recordSelected, setRecordSelected] = useState<IWard>();

  const handleSubmit = (values: any, callback?: Function) => {
    console.log('values: ', values);
  };

  const handleUpdateStatus = (record: IWard) => {
    console.log('Update status for record: ', record);
  };

  const actions = (record: IWard) => [
    {
      icon: <AiOutlineEdit size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => {
        modal.open();
        setRecordSelected(record);
      },
    },
    {
      icon: <AiOutlineDelete size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => () => {},
    },
  ];

  const data = Array.from({ length: 33 }, (_, index) => ({
    code: `W${index + 1}`,
    name: `Ward ${index + 1}`,
    priority: index + 1,
    status: index % 2 === 0,
  }));

  const { remainingData, handleSearch } = useSearchData({
    list: data,
    keys: ['name', 'code'],
  });

  const columns: IMRT_ColumnDef_Custom<IWard>[] = useMemo(
    () => [
      {
        header: 'Mã Phường/Xã',
        accessorKey: 'code',
      },
      {
        header: 'Tên Phường/Xã',
        accessorKey: 'name',
      },
      {
        header: 'Thứ tự ưu tiên',
        accessorKey: 'priority',
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        Cell: (props) => {
          return (
            <RowActionsEllipsis actions={actions(props.row.original)}>
              <Switch
                checked={props.row.original.status}
                onChange={() => handleUpdateStatus(props.row.original)}
              />
            </RowActionsEllipsis>
          );
        },
      },
    ],
    //eslint-disable-next-line
    []
  );

  return (
    <>
      <Helmet>
        <title>Quản lý Phường/Xã</title>
      </Helmet>

      <WardModal
        initialValues={recordSelected}
        opened={opened}
        onClose={modal.close}
        onSubmit={handleSubmit}
      />

      <TableHeader>
        <Text fw={500} fz={18}>
          Danh sách đơn vị hành chính cấp Phường/Xã
        </Text>

        <Group>
          <Select
            clearable={false}
            placeholder="Chọn Tỉnh/Thành phố"
            data={[
              { label: 'Tỉnh/Thành phố 1', value: '1' },
              { label: 'Tỉnh/Thành phố 2', value: '2' },
            ]}
          />

          <Input
            placeholder="Tìm kiếm ..."
            leftSection={<IoSearchOutline size={20} />}
            onChange={(e) => {
              debounce(() => {
                handleSearch(e.target.value);
              });
            }}
          />
          <Button onClick={modal.open}>Thêm</Button>
        </Group>
      </TableHeader>

      <TableWithPaginationV2
        enableRowNumbers
        data={remainingData}
        columns={columns}
        isLoading={false}
        pagination={pagination(remainingData.length)}
        scrollY={`calc(100vh - 21.8rem)`}
      />
    </>
  );
}
