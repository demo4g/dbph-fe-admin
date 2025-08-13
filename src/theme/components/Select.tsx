import { Select } from '@mantine/core';

export const MantineSelect = Select.extend({
  defaultProps: {
    size: 'md',
    clearable: true,
    searchable: true,
    allowDeselect: false,
    nothingFoundMessage: 'Không có dữ liệu',
  },
});
