import { Switch } from '@mantine/core';

export const MantineSwitch = Switch.extend({
  styles: {
    root: {
      display: 'flex',
    },
    body: {
      display: 'inline-flex',
    },
  },
});
