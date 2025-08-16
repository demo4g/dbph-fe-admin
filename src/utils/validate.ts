import { notifications } from '@mantine/notifications';
import { IMAGE_MAX_SIZE } from '~/constants';
import { COLORS } from '~/theme';
import { numberToBytes } from './format';

export const validateFileSize = (file: File | null) => {
  if (!file) return;

  // File > 10MB
  if (file.size > IMAGE_MAX_SIZE) {
    notifications.show({
      title: 'Tệp quá kích thước quy định',
      message: `Vui lòng tải tệp < ${numberToBytes(IMAGE_MAX_SIZE)}`,
      color: COLORS.RED,
    });
    return false;
  }

  return true;
};
