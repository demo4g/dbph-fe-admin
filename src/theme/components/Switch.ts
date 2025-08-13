import { Switch } from '@mantine/core';

export const MantineSwitch = Switch.extend({
  defaultProps: {
    size: 'md',
  },
  styles: {
    root: {
      display: 'flex',
    },
    body: {
      display: 'inline-flex',
    },
  },
});
