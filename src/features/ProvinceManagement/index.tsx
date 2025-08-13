import { Button, Group, Input, ScrollArea, Switch, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoSearchOutline } from 'react-icons/io5';
import { useTheme } from 'styled-components';
import { TableHeader } from '~/components/GlobalStyled';
import RowActionsEllipsis from '~/components/UI/Tables/RowActionsEllipsis';
import useDebounce from '~/hooks/useDebounce';
import useSearchData from '~/hooks/useSearchData';
import ProvinceModal from './ProvinceModal';
import { IProvince } from './services';

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

  const handleSubmit = (values: any, callback?: Function) => {
    console.log('values: ', values);
  };

  const handleUpdateStatus = (record: IProvince) => {
    console.log('Update status for record: ', record);
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
      onClick: () => () => {},
    },
  ];

  const data = Array.from({ length: 33 }, (_, index) => ({
    id: index + 1,
    code: `P${index + 1}`,
    name: `Province ${index + 1}`,
    priority: index + 1,
    status: index % 2 === 0,
  }));

  const { remainingData, handleSearch } = useSearchData({
    list: data,
    keys: ['name', 'code'],
  });

  return (
    <>
      <Helmet>
        <title>Quản lý Tỉnh/Thành phố</title>
      </Helmet>

      <ProvinceModal
        initialValues={recordSelected}
        opened={opened}
        onClose={modal.close}
        onSubmit={handleSubmit}
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
              <Table.Th>STT</Table.Th>
              <Table.Th>Mã Tỉnh/thành phố</Table.Th>
              <Table.Th>Tên Tỉnh/thành phố</Table.Th>
              <Table.Th>Thứ tự ưu tiên</Table.Th>
              <Table.Th w={240}>Trạng thái</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {remainingData?.map((e, index) => (
              <Table.Tr key={e.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{e.code}</Table.Td>
                <Table.Td>{e.name}</Table.Td>
                <Table.Td>{e.priority}</Table.Td>
                <Table.Td>
                  <RowActionsEllipsis actions={actions(e)}>
                    <Switch checked={e.status} onChange={() => handleUpdateStatus(e)} />
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
