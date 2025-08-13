import { DatePickerInput } from '@mantine/dates';
import { DATE_FORMAT } from '~/constants';

export const MantineDatePickerInput = DatePickerInput.extend({
  defaultProps: {
    size: 'md',
    valueFormat: DATE_FORMAT,
    clearable: true,
  },
});
