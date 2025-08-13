import { Textarea } from '@mantine/core';

export const MantineTextarea = Textarea.extend({
  defaultProps: {
    minRows: 3,
    maxRows: 5,
    autosize: true,
  },
});
