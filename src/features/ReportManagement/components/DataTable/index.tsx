import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useMemo, useState } from 'react';
import {
  AiOutlineCloudDownload,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
} from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import RowActionsEllipsis from '~/components/UI/Tables/RowActionsEllipsis';
import TableWithPagination, {
  IMRT_ColumnDef_Custom,
  ITableWithPaginationProps,
} from '~/components/UI/Tables/TableWithPagination';
import { utils } from '~/utils';
import { IReportItem } from '../../services';
import ReportManagementModal from '../ReportModal';

export interface IDataTableProps extends Partial<ITableWithPaginationProps> {
  refetch: Function;
  data?: any;
}

export default function DataTable({ data, refetch, ...props }: IDataTableProps) {
  const theme = useTheme();
  const [opened, modal] = useDisclosure();

  const [recordSelected, setRecordSelected] = useState<IReportItem>();
  const [readOnly, setReadOnly] = useState(false);

  const handleSubmit = (values: any, callback?: Function) => {
    console.log('values: ', values);
  };

  const handleDownload = (record: IReportItem) => {
    modals.openConfirmModal({
      title: 'Xác nhận tải xuống báo cáo',
      labels: { confirm: 'Tải xuống', cancel: 'Hủy' },
      children: (
        <Stack gap={4}>
          <Text>Bạn có chắc muốn tải xuống báo cáo?</Text>
          <Text>
            - Mã báo cáo: <b>{record.code}</b>
          </Text>
          <Text>
            - Tên báo cáo: <b>{record.name}</b>
          </Text>
          <Text>
            - Năm: <b>{record.year}</b>
          </Text>
          <Text>
            - Kích thước: <b>{utils.format.numberToBytes(1437423)}</b>
          </Text>
        </Stack>
      ),
      onConfirm: () => {
        // Logic to handle file download
        console.log('Downloading report:', record);
      },
    });
  };

  const handleOpenModal = () => {
    modal.open();
    setRecordSelected(undefined);
    setReadOnly(false);
  };

  const handleCloseModal = () => {
    modal.close();
    setRecordSelected(undefined);
    setReadOnly(false);
  };

  const actions = (record: IReportItem) => [
    {
      icon: <AiOutlineCloudDownload size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => handleDownload(record),
    },
    {
      icon: <AiOutlineEye size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => {
        modal.open();
        setRecordSelected(record);
        setReadOnly(true);
      },
    },
    {
      icon: <AiOutlineEdit size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => {
        modal.open();
        setRecordSelected(record);
        setReadOnly(false);
      },
    },
    {
      icon: <AiOutlineDelete size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => () => {},
    },
  ];

  const columns: IMRT_ColumnDef_Custom<IReportItem>[] = useMemo(
    () => [
      {
        header: 'Mã báo cáo',
        accessorKey: 'code',
      },
      {
        header: 'Tên báo cáo',
        accessorKey: 'name',
      },
      {
        header: 'Năm',
        accessorKey: 'year',
      },
      {
        header: 'Giá tiền',
        accessorKey: 'price',
        Cell: (props) => utils.format.displayNumber(props.row.original.price),
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        Cell: (props) => {
          return (
            <RowActionsEllipsis actions={actions(props.row.original)}>
              <Text>{props.row.original.status}</Text>
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
      <ReportManagementModal
        opened={opened}
        readOnly={readOnly}
        initialValues={recordSelected}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <TableHeader>
        <Text fw={500} fz={18}>
          Danh sách báo cáo
        </Text>

        <Button onClick={handleOpenModal}>Thêm báo cáo</Button>
      </TableHeader>

      <TableWithPagination data={data} columns={columns} {...props} />
    </>
  );
}
