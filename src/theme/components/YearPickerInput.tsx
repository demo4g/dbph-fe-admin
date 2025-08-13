import { YearPickerInput } from '@mantine/dates';

export const MantineYearPickerInput = YearPickerInput.extend({
  defaultProps: {
    size: 'md',
    clearable: true,
  },
});
