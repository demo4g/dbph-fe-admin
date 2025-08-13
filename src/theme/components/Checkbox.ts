import { Checkbox } from '@mantine/core';

export const MantineCheckbox = Checkbox.extend({
  defaultProps: {
    variant: 'outline',
  },
  styles: {
    label: {
      fontSize: '1.6rem',
    },
    input: {
      borderRadius: 4,
      // backgroundColor: COLORS.PRIMARY + '10',
    },
  },
});
