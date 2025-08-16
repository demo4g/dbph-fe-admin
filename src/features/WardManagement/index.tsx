import { Button, Group, Input, Select, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useEffect, useMemo, useState } from 'react';
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
import { IResponse } from '~/types';
import { useGetProvinceList } from '../ProvinceManagement/services';
import { IWard, useCreateWard, useDeleteWard, useGetWardList, useUpdateWard } from './services';
import WardModal from './WardModal';

const initialFilter = {
  page: 1,
  limit: DEFAULT_PAGESIZE,
  parent_id: '',
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
  const { filter, pagination, handleFilter } = useFilter(initialFilter);

  const [opened, modal] = useDisclosure();
  const [recordSelected, setRecordSelected] = useState<IWard>();

  const { mutate: createWard, isLoading: createLoading } = useCreateWard();
  const { mutate: updateWard, isLoading: updateLoading } = useUpdateWard();
  const { mutate: deleteWard } = useDeleteWard();

  // Danh sách tỉnh/thành
  const { data: provinceList = [] } = useGetProvinceList();

  // Danh sách phường/xã theo tỉnh
  const { data: wardList = [] } = useGetWardList({
    params: filter.parent_id,
    options: {
      select: (data: IResponse<IWard[]>) =>
        data?.data?.sort((a, b) => {
          // Nếu priority = 0 thì coi như vô cực để đưa xuống cuối
          const pa = a.priority === 0 ? Infinity : a.priority;
          const pb = b.priority === 0 ? Infinity : b.priority;
          return pa - pb;
        }),
    },
  });

  // Select mặc định tỉnh đầu tiên
  useEffect(() => {
    if (!provinceList || provinceList.length === 0) return;
    handleFilter({ parent_id: provinceList[0]._id });
    // eslint-disable-next-line
  }, [provinceList]);

  const handleSubmit = (values: any, callback?: Function) => {
    const isUpdate = !!recordSelected;

    const payload = {
      ...values,
      id: recordSelected?._id,
    };

    console.log('payload: ', payload);

    if (isUpdate) {
      updateWard(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Cập nhật Phường/Xã thành công' });
        },
      });
    } else {
      createWard(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Thêm Phường/Xã thành công' });
        },
      });
    }
  };

  const handleUpdateStatus = (record: IWard) => {
    console.log('Update status for record: ', record);

    const payload = {
      ...record,
      id: record._id,
      is_enable: !record.is_enable,
    };

    updateWard(payload, {
      onSuccess: () => {
        notifications.show({ message: 'Cập nhật trạng thái thành công' });
      },
    });
  };

  const handleDelete = (record: IWard) => {
    modals.openConfirmModal({
      title: 'Xóa Phường/Xã?',
      children: (
        <Text>
          Bạn có chắc chắn muốn xóa <b>{record.name}</b>?
        </Text>
      ),
      onConfirm: () => {
        deleteWard(record._id, {
          onSuccess: () => {
            notifications.show({ message: 'Xóa Phường/Xã thành công' });
          },
        });
      },
    });
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
      onClick: () => handleDelete(record),
    },
  ];

  const { remainingData, handleSearch } = useSearchData({
    list: wardList,
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
                checked={props.row.original.is_enable}
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
        provinceId={filter.parent_id}
        confirmLoading={createLoading || updateLoading}
        onSubmit={handleSubmit}
        onClose={() => {
          modal.close();
          setRecordSelected(undefined);
        }}
      />

      <TableHeader>
        <Text fw={500} fz={18}>
          Danh sách đơn vị hành chính cấp Phường/Xã
        </Text>

        <Group>
          <Select
            w={240}
            clearable={false}
            placeholder="Chọn Tỉnh/Thành phố"
            data={provinceList.map((e) => ({ label: e.name, value: e._id }))}
            value={filter.parent_id}
            onChange={(e) => handleFilter({ parent_id: e || undefined })}
          />

          <Input
            w={240}
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
