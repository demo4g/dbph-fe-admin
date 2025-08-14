import { Box, Group, Pagination, Select, Text } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';
import { useEffect, useState } from 'react';
import { DEFAULT_PAGESIZE } from '~/constants';
import { ITableWithPaginationProps } from '../TableWithPagination';

/**
 * @description handle data and pagnination on local
 * @source https://www.mantine-react-table.com
 */
export default function TableWithPaginationV2({
  scrollY,
  scrollX,
  isLoading,
  columns,
  data,
  pagination,
  state,
  showPagination = true,
  mantineTableContainerProps,
  ...props
}: ITableWithPaginationProps) {
  // pageIndex of the table starts from 0
  const [_pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: DEFAULT_PAGESIZE,
  });

  const totalRecords = data.length;
  const startItemIndex = _pagination.pageIndex * _pagination.pageSize;
  const endItemIndex =
    startItemIndex + (totalRecords > _pagination.pageSize ? _pagination.pageSize : totalRecords);

  const pageSizeList = [
    { label: `5/ Trang`, value: '5' },
    { label: `10/ Trang`, value: '10' },
    { label: `20/ Trang`, value: '20' },
    { label: `50/ Trang`, value: '50' },
  ];

  const _columns = columns?.map((column) => ({
    ...column,
    // ellipsis header
    Header: (props: any) => (
      <Text
        lineClamp={1}
        fw={500}
        title={props.header.column.columnDef.header}
        style={{ display: 'block', whiteSpace: 'nowrap', wordBreak: 'break-all' }}
      >
        {props.header.column.columnDef.header}
      </Text>
    ),

    Cell: (props: any) => {
      if (column.Cell) return column.Cell(props);

      //Default ellipsis column
      if (column.ellipsis === false) return props.renderedCellValue;

      const record = props.row.original;
      const key = props.column.id;
      const showTitle = typeof record[key] === 'string' || typeof record[key] === 'number';

      return (
        <Text
          lineClamp={1}
          title={showTitle ? record[key] : ''}
          style={{
            display: 'block',
            whiteSpace: 'nowrap',
            wordBreak: 'break-all',
          }}
        >
          {props.renderedCellValue}
        </Text>
      );
    },
  }));

  const table = useMantineReactTable({
    columns: _columns,
    data,
    localization: MRT_Localization_VI,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    enableRowNumbers: false,
    enablePagination: true,
    manualPagination: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableColumnActions: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    mantineTableContainerProps: {
      style: { maxHeight: scrollY, overflow: 'auto', height: '100vh' },
      ...mantineTableContainerProps,
    },
    mantineTableProps: {
      style: { width: scrollX },
    },
    state: {
      pagination: _pagination,
      isLoading,
      ...state,
    },
    mantineSelectCheckboxProps: (props) => ({
      size: 'sm',
    }),
    mantineSelectAllCheckboxProps: (props) => ({
      size: 'sm',
    }),
    mantineExpandAllButtonProps: (props) => ({}),
    ...props,
  });

  useEffect(() => {
    if (!pagination?.pageIndex || !pagination.pageSize) return;
    setPagination({
      pageIndex: pagination.pageIndex - 1,
      pageSize: pagination.pageSize,
    });
  }, [pagination?.pageIndex, pagination?.pageSize]);

  useEffect(() => {
    pagination?.onChange(_pagination.pageIndex + 1, _pagination.pageSize);
    // eslint-disable-next-line
  }, [_pagination]);

  return (
    <>
      <MantineReactTable table={table} />
      {showPagination && (
        <Group justify="space-between" pos="relative" h={64}>
          {data.length !== 0 ? (
            <Text miw={240}>
              {startItemIndex + totalRecords > 0 ? startItemIndex + 1 : 0} -{' '}
              {endItemIndex > totalRecords ? totalRecords : endItemIndex} trong số {totalRecords}
            </Text>
          ) : (
            <Box />
          )}

          <Pagination
            total={Math.ceil(totalRecords / _pagination.pageSize)}
            value={_pagination.pageIndex + 1}
            onChange={(e) => {
              setPagination((prevState: any) => ({ ...prevState, pageIndex: e - 1 }));
            }}
            styles={{
              root: {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
          />

          <Select
            w={140}
            value={_pagination.pageSize.toString()}
            onChange={(e) => Number(e) && setPagination({ pageIndex: 0, pageSize: Number(e) })}
            data={pageSizeList}
            clearable={false}
          />
        </Group>
      )}
    </>
  );
}
