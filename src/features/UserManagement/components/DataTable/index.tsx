import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import TableWithPagination, {
  IMRT_ColumnDef_Custom,
  ITableWithPaginationProps,
} from '~/components/UI/Tables/TableWithPagination';
import { DATE_TIME_FORMAT } from '~/constants';
import { EUSER_STATUS, IUserItem } from '../../services';

export interface IDataTableProps extends Partial<ITableWithPaginationProps> {
  data?: any;
}

export default function DataTable({ data, ...props }: IDataTableProps) {
  const theme = useTheme();

  const columns: IMRT_ColumnDef_Custom<IUserItem>[] = useMemo(
    () => [
      {
        header: 'Số điện thoại',
        accessorKey: 'phone',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Tên người dùng',
        accessorKey: 'name',
      },
      {
        header: 'Thời gian tạo',
        accessorKey: 'created_at',
        Cell: (props) => dayjs(props.row.original.created_at).format(DATE_TIME_FORMAT),
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        Cell: (props) => {
          const status = props.row.original.status;
          if (status === EUSER_STATUS.ACTIVE) {
            return <Text c={theme?.colors.GREEN}>Hoạt động</Text>;
          }
          return <Text c={theme?.colors.RED}>Không hoạt động</Text>;
        },
      },
    ],
    //eslint-disable-next-line
    []
  );

  return (
    <>
      <TableHeader>
        <Text fw={500} fz={18}>
          Danh sách người dùng
        </Text>
      </TableHeader>

      <TableWithPagination enableRowNumbers data={data} columns={columns} {...props} />
    </>
  );
}
