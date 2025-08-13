import { Box, Group, Pagination, Select, Text } from '@mantine/core';
import {
  MantineReactTable,
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableOptions,
  useMantineReactTable,
} from 'mantine-react-table';
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi';
import { useEffect, useMemo, useState } from 'react';

/** Custom mantine table column type */
export interface IMRT_ColumnDef_Custom<TData extends MRT_RowData> extends MRT_ColumnDef<TData> {
  ellipsis?: boolean;
}

export interface ITableWithPaginationProps extends MRT_TableOptions<any> {
  scrollY?: string; //Height to scroll table body
  scrollX?: string;
  isLoading?: boolean; //Loading state table
  showPagination?: boolean;
  columns: IMRT_ColumnDef_Custom<any>[];
  pagination?: {
    pageIndex: number;
    pageSize: number;
    total?: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

/**
 * @description data and pagnination get from server
 * @source https://www.mantine-react-table.com
 */
export default function TableWithPagination({
  scrollY,
  scrollX,
  isLoading,
  columns,
  pagination,
  state,
  mantineTableContainerProps,
  data,
  ...props
}: ITableWithPaginationProps) {
  const [totalRecords, setTotalRecords] = useState(1); //Save total records in state to avoid rendering pagination when calling the api
  const [totalPage, setTotalPage] = useState(1); //Save total page in state to avoid rendering pagination when calling the api
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 1);

  const startIndex = useMemo(() => (pageIndex - 1) * pageSize, [pageIndex, pageSize]);
  const lastIndex = useMemo(() => {
    return Math.min(startIndex + pageSize, totalRecords);
  }, [startIndex, pageSize, totalRecords]);
  const message = `Hiển thị ${startIndex + 1} - ${lastIndex} của ${totalRecords}`;

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
        style={{ display: 'block', wordBreak: 'break-all' }}
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
          style={{ display: 'block', whiteSpace: 'nowrap', wordBreak: 'break-all' }}
        >
          {props.renderedCellValue}
        </Text>
      );
    },
  }));

  const table = useMantineReactTable({
    data,
    columns: _columns,
    localization: MRT_Localization_VI,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    enableRowNumbers: false,
    enablePagination: false,
    manualPagination: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableColumnActions: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    // rowNumberDisplayMode: 'original',
    mantineTableContainerProps: {
      style: { maxHeight: scrollY, height: '100vh' },
      ...mantineTableContainerProps,
    },
    mantineTableProps: {
      style: { width: scrollX },
    },
    state: {
      pagination: { pageIndex, pageSize },
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
    if (pagination?.total === undefined) return;
    setTotalRecords(pagination.total);
  }, [pagination?.total]);

  useEffect(() => {
    if (pagination?.pageSize === undefined || pagination?.total === undefined) return;
    setTotalPage(Math.ceil(pagination.total / pagination.pageSize));
  }, [pagination?.pageSize, pagination?.total]);

  useEffect(() => {
    setPageIndex((pagination?.pageIndex || 1) - 1);
  }, [pagination?.pageIndex]);

  useEffect(() => {
    pagination?.onChange(pageIndex + 1, pageSize);
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  return (
    <>
      <MantineReactTable table={table} />

      <Group justify="space-between" pos="relative" h={64}>
        {data.length !== 0 ? (
          <Text miw={240} className="nvt-table-total">
            {message}
          </Text>
        ) : (
          <Box />
        )}

        <Pagination
          total={totalPage}
          value={pageIndex + 1}
          onChange={(e) => setPageIndex(e - 1)}
          styles={{ root: { position: 'absolute', left: '50%', transform: 'translateX(-50%)' } }}
        />

        <Select
          w={140}
          clearable={false}
          value={pageSize.toString()}
          data={pageSizeList}
          onChange={(e) => {
            if (!Number(e)) return;
            setPageIndex(0);
            setPageSize(Number(e));
          }}
        />
      </Group>
    </>
  );
}
