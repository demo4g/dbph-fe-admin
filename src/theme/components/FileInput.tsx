import { FileInput } from '@mantine/core';
import FileUploadIcon from '~/components/Icons/FileUploadIcon';

export const MantineFileInput = FileInput.extend({
  defaultProps: {
    // size: 'md',
    rightSection: <FileUploadIcon />,
  },
});
