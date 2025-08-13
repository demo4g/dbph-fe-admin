import { notifications } from '@mantine/notifications';
import { IMAGE_MAX_SIZE } from '~/constants';
import { COLORS } from '~/theme';

export const validateFileSize = (file: File | null) => {
  if (!file) return;

  // File > 10MB
  if (file.size > IMAGE_MAX_SIZE) {
    notifications.show({
      title: 'Tệp quá kích thước quy định',
      message: 'Vui lòng tải tệp < 10MB',
      color: COLORS.RED,
    });
    return false;
  }

  return true;
};
