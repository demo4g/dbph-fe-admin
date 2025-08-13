import { Loader } from '@mantine/core';

export const MantineLoader = Loader.extend({
  defaultProps: {
    type: 'bars',
    size: 'xs',
  },
});
