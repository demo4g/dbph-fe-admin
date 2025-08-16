import { Button, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useMemo, useState } from 'react';
import { AiOutlineCloudDownload, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import RowActionsEllipsis from '~/components/UI/Tables/RowActionsEllipsis';
import TableWithPagination, {
  IMRT_ColumnDef_Custom,
  ITableWithPaginationProps,
} from '~/components/UI/Tables/TableWithPagination';
import { utils } from '~/utils';
import { IReportItem, useCreateReport, useUpdateReport } from '../../services';
import { EREPORT_STATUS } from '../../services/ReportManagement.enum';
import ReportManagementModal from '../ReportModal';

export interface IDataTableProps extends Partial<ITableWithPaginationProps> {
  refetch: Function;
  data?: any;
}

export default function DataTable({ data, refetch, ...props }: IDataTableProps) {
  const theme = useTheme();
  const [opened, modal] = useDisclosure();

  const [recordSelected, setRecordSelected] = useState<IReportItem>();

  const { mutate: createReport, isLoading: createLoading } = useCreateReport();
  const { mutate: updateReport, isLoading: updateLoading } = useUpdateReport();

  const handleSubmit = (values: any, callback?: Function) => {
    console.log('values: ', values);
    const isUpdate = !!recordSelected;
    const payload = {
      ...values,
      fileName: values.file,
      id: recordSelected?._id,
    };

    if (isUpdate) {
      updateReport(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Cập nhật báo cáo thành công' });
        },
      });
    } else {
      createReport(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Tạo báo cáo thành công' });
        },
      });
    }
  };

  const handleDownload = (record: IReportItem) => {
    modals.openConfirmModal({
      title: 'Xác nhận tải xuống báo cáo',
      labels: { confirm: 'Tải xuống', cancel: 'Hủy' },
      children: (
        <Stack gap={4}>
          <Text>Bạn có chắc muốn tải xuống báo cáo?</Text>
          <Text>
            - Tên báo cáo: <b>{record.name}</b>
          </Text>
          <Text>
            - Địa phương: <b>{[record.ward, record.province].filter((e) => !!e).join(', ')}</b>
          </Text>
          <Text>
            - Năm: <b>{record.year}</b>
          </Text>
          <Text>
            - Kích thước: <b>{utils.format.numberToBytes(record.file_size)}</b>
          </Text>
        </Stack>
      ),
      onConfirm: () => {
        // Logic to handle file download
        console.log('Downloading report:', record);
      },
    });
  };

  const handleDelete = (record: IReportItem) => {
    modals.openConfirmModal({
      title: 'Xác nhận xóa báo cáo',
      labels: { confirm: 'Xóa', cancel: 'Hủy' },
      children: (
        <Stack gap={4}>
          <Text>Bạn có chắc muốn xóa báo cáo?</Text>
          <Text>
            - Tên báo cáo: <b>{record.name}</b>
          </Text>
          <Text>
            - Địa phương: <b>{[record.ward, record.province].filter((e) => !!e).join(', ')}</b>
          </Text>
          <Text>
            - Năm: <b>{record.year}</b>
          </Text>
          <Text>
            - Kích thước: <b>{utils.format.numberToBytes(record.file_size)}</b>
          </Text>
        </Stack>
      ),
      onConfirm: () => {
        // Logic to handle report deletion
        console.log('Deleting report:', record);
      },
    });
  };

  const handleOpenModal = () => {
    modal.open();
    setRecordSelected(undefined);
  };

  const handleCloseModal = () => {
    modal.close();
    setRecordSelected(undefined);
  };

  const actions = (record: IReportItem) => [
    {
      icon: <AiOutlineCloudDownload size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => handleDownload(record),
    },
    {
      icon: <AiOutlineEdit size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => {
        modal.open();
        setRecordSelected(record);
      },
    },
    {
      icon: <AiOutlineDelete size={20} color={theme?.colors.PRIMARY} />,
      onClick: () => handleDelete(record),
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
        header: 'Địa phương',
        accessorKey: 'province',
        Cell: (props) => {
          const province = props.row.original.province;
          const ward = props.row.original.ward;
          return [ward, province].filter((e) => !!e).join(', ') || '-';
        },
      },
      {
        header: 'Năm',
        accessorKey: 'year',
        size: 120,
      },
      {
        header: 'Giá tiền (VND)',
        accessorKey: 'price',
        Cell: (props) => utils.format.displayNumber(props.row.original.price),
        size: 120,
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        Cell: (props) => {
          const status = props.row.original.status;
          const isEnabled = status === EREPORT_STATUS.ENABLED;
          return (
            <RowActionsEllipsis actions={actions(props.row.original)}>
              <Text c={isEnabled ? theme?.colors.GREEN : theme?.colors.RED}>
                {isEnabled ? 'Hoạt động' : 'Không hoạt động'}
              </Text>
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
        reportId={recordSelected?._id}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        confirmLoading={createLoading || updateLoading}
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
