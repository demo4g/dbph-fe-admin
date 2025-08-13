import { MonthPickerInput } from '@mantine/dates';

export const MantineMonthPickerInput = MonthPickerInput.extend({
  defaultProps: {
    size: 'md',
    clearable: true,
  },
});
