import { Button } from '@mantine/core';

export const MantineButton = Button.extend({
  defaultProps: {
    size: 'md',
  },
  styles: {
    root: {
      // height: '4.4rem',
      // fontSize: '1.6rem',
      fontWeight: 400,
    },
  },
});
