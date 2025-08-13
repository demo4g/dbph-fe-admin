import { NumberInput } from '@mantine/core';

export const MantineNumberInput = NumberInput.extend({
  defaultProps: {
    size: 'md',
    allowDecimal: false,
    allowNegative: false,
    hideControls: true,
    // size: 'md',
  },
});
