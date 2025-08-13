import { Table } from '@mantine/core';
import * as COLORS from '../colors';
import * as SIZES from '../sizes';

export const MantineTable = Table.extend({
  defaultProps: {
    highlightOnHover: true,
    highlightOnHoverColor: COLORS.HOVER_PRIMARY,
  },
  styles: {
    tr: {
      // minHeight: SIZES.TABLE_ROW_HEIGHT,
      // height: SIZES.TABLE_ROW_HEIGHT,
    },
    th: {
      minHeight: SIZES.TABLE_ROW_HEIGHT,
      height: SIZES.TABLE_ROW_HEIGHT,
      backgroundColor: COLORS.HOVER_PRIMARY,
      fontWeight: 500,
    },
    td: {
      minHeight: SIZES.TABLE_ROW_HEIGHT,
      height: SIZES.TABLE_ROW_HEIGHT,
      paddingBlock: 4,
      flexWrap: 'wrap',
    },
  },
});
