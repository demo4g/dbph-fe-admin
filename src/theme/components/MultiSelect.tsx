import { MultiSelect } from '@mantine/core';

export const MantineMultiSelect = MultiSelect.extend({
  defaultProps: {
    size: 'md',
    clearable: true,
    searchable: true,
    nothingFoundMessage: 'Không có dữ liệu',
  },
});
