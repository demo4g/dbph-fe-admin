import { Button, Group, Input, ScrollArea, Switch, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import RowActionsEllipsis from '~/components/UI/Tables/RowActionsEllipsis';
import useDebounce from '~/hooks/useDebounce';
import useSearchData from '~/hooks/useSearchData';
import { IResponse } from '~/types';
import ProvinceModal from './ProvinceModal';
import {
  IProvince,
  useCreateProvince,
  useDeleteProvince,
  useGetProvinceList,
  useUpdateProvince,
} from './services';

export interface IProvinceManagementProps {}

/**
 * @page
 * @description Quản lý Tỉnh/Thành phố
 * @createdAt 12/08/2025
 */
export default function ProvinceManagement(props: IProvinceManagementProps) {
  const theme = useTheme();
  const debounce = useDebounce();

  const [opened, modal] = useDisclosure();
  const [recordSelected, setRecordSelected] = useState<IProvince>();

  const { data: provinceList = [] } = useGetProvinceList({
    options: {
      select: (data: IResponse<IProvince[]>) =>
        data?.data?.sort((a, b) => {
          // Nếu priority = 0 thì coi như vô cực để đưa xuống cuối
          const pa = a.priority === 0 ? Infinity : a.priority;
          const pb = b.priority === 0 ? Infinity : b.priority;
          return pa - pb;
        }),
    },
  });

  const { mutate: createProvince, isLoading: createLoading } = useCreateProvince();
  const { mutate: updateProvince, isLoading: updateLoading } = useUpdateProvince();
  const { mutate: deleteProvince } = useDeleteProvince();

  const { remainingData, handleSearch } = useSearchData({
    list: provinceList,
    keys: ['name', 'code'],
  });

  const handleSubmit = (values: any, callback?: Function) => {
    const isUpdate = !!recordSelected;

    const payload = {
      ...values,
      id: recordSelected?._id,
    };

    console.log('payload: ', payload);

    if (isUpdate) {
      updateProvince(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Cập nhật Tỉnh/Thành phố thành công' });
        },
      });
    } else {
      createProvince(payload, {
        onSuccess: () => {
          callback?.();
          notifications.show({ message: 'Thêm Tỉnh/Thành phố thành công' });
        },
      });
    }
  };

  const handleUpdateStatus = (record: IProvince) => {
    console.log('Update status for record: ', record);

    const payload = {
      ...record,
      id: record._id,
      is_enable: !record.is_enable,
    };

    updateProvince(payload, {
      onSuccess: () => {
        notifications.show({ message: 'Cập nhật trạng thái thành công' });
      },
    });
  };

  const handleDelete = (record: IProvince) => {
    modals.openConfirmModal({
      title: 'Xóa Tỉnh/Thành phố?',
      children: (
        <Text>
          Bạn có chắc chắn muốn xóa <b>{record.name}</b>?
        </Text>
      ),
      onConfirm: () => {
        deleteProvince(record._id, {
          onSuccess: () => {
            notifications.show({ message: 'Xóa Tỉnh/Thành phố thành công' });
          },
        });
      },
    });
  };

  const actions = (record: IProvince) => [
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

  return (
    <>
      <Helmet>
        <title>Quản lý Tỉnh/Thành phố</title>
      </Helmet>

      <ProvinceModal
        initialValues={recordSelected}
        opened={opened}
        onSubmit={handleSubmit}
        confirmLoading={createLoading || updateLoading}
        onClose={() => {
          modal.close();
          setRecordSelected(undefined);
        }}
      />

      <TableHeader>
        <Text fw={500} fz={18}>
          Danh sách đơn vị hành chính cấp Tỉnh/ Thành phố
        </Text>

        <Group>
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

      <ScrollArea
        scrollbarSize={0}
        style={{
          background: theme?.colors.BACKGROUND_PRIMARY,
          boxShadow: theme?.shadows.SHADOW_TABLE,
          height: `calc(100vh - 17rem)`,
        }}
      >
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>#</Table.Th>
              <Table.Th>Mã Tỉnh/thành phố</Table.Th>
              <Table.Th>Tên Tỉnh/thành phố</Table.Th>
              <Table.Th>Thứ tự ưu tiên</Table.Th>
              <Table.Th w={240}>Trạng thái</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {remainingData?.map((e, index) => (
              <Table.Tr key={e.code}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{e.code}</Table.Td>
                <Table.Td>{e.name}</Table.Td>
                <Table.Td>{e.priority}</Table.Td>
                <Table.Td>
                  <RowActionsEllipsis actions={actions(e)}>
                    <Switch checked={e.is_enable} onChange={() => handleUpdateStatus(e)} />
                  </RowActionsEllipsis>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
