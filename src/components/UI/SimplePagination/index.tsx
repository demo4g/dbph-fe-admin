import { Group, Pagination, PaginationProps, Text } from '@mantine/core';

export interface ISimplePaginationProps extends PaginationProps {
  total: number;
  page: number;
  limit?: number;
}

export default function SimplePagination({
  total,
  page,
  limit = 10,
  ...props
}: ISimplePaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const lastIndex = Math.min(startIndex + limit, total);
  const message = `Hiển thị ${startIndex + 1} - ${lastIndex} của ${total}`;

  // if (limit >= total) return null;

  return (
    <Group justify="flex-end" mt={8}>
      <Text size="sm">{message}</Text>
      <Pagination total={totalPages} value={page} withPages={false} {...props} />
    </Group>
  );
}
