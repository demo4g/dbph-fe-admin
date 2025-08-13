import { Modal } from '@mantine/core';
import * as SIZES from '../sizes';
import * as COLORS from '../colors';

export const MantineModal = Modal.extend({
  defaultProps: {
    size: 1552,
    centered: true,
    closeOnClickOutside: false,
    returnFocus: false,
  },
  styles: {
    title: {
      fontWeight: 500,
    },
    header: {
      border: `1px solid ${COLORS.BORDER_PRIMARY}`,
      height: SIZES.MODAL_HEADER_HEIGHT,
      minHeight: SIZES.MODAL_HEADER_HEIGHT,
    },
    content: {
      maxHeight: SIZES.MODAL_MAX_HEIGHT,
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: SIZES.MODAL_BODY_MAX_HEIGHT,
      paddingTop: '1.6rem',
    },
  },
});
